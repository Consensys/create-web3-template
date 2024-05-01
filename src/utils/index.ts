import inquirer from "inquirer";
import { execSync } from "child_process";
import fs from "fs";
import { Template } from "../../types.js";
import { TEMPLATES } from "../templates.js";

const validateTemplateExists = (input: string): boolean => {
  if (!input) {
    throw new Error("Template not found");
  }
  return true;
};

const cloneAndSetupTemplate = (template: Template, path: string): void => {
  validateTemplateExists(template.id);

  execSync(`git clone ${template.repo_url} ${path}`);

  const packageJsonPath = `${path}/package.json`;
  const packageJson = fs.readFileSync(packageJsonPath, "utf-8");
  const newPackageJson = packageJson.replace(
    template.packageName,
    path.split("/")[0]
  );
  fs.writeFileSync(packageJsonPath, newPackageJson);

  removeGitFolder(path);
  setupGitRepository(path);
};

export async function cloneTemplate(
  templateId: string,
  path: string
): Promise<void> {
  const template = TEMPLATES.find(
    (t) => t.id === templateId
  ) as unknown as Template;
  if (!template) {
    throw new Error("Template not found");
  }

  cloneAndSetupTemplate(template, path);
}

const removeGitFolder = (projectName: string) => {
  const gitPath = `${projectName}/.git`;
  fs.rm(gitPath, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
  });
  console.log("Project created successfully.");
};

export async function promptForProjectDetails(args: string) {
  if (!args) {
    const { projectName } = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "Please specify a name for your project: ",
        validate: (input) => {
          if (!input) {
            return "Project name cannot be empty";
          }
          return true;
        },
      },
    ]);
    console.log("Creating project with name:", projectName);
    return projectName;
  }
  return args;
}

export async function promptForTemplate(): Promise<Template> {
  const { template }: { template: string } = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "Please specify a template: ",
      choices: TEMPLATES.map((template) => template.title),
    },
  ]);
  const selectedTemplate = TEMPLATES.find(
    (t) => t.title === template
  ) as unknown as Template;
  console.log("Creating project with template:", selectedTemplate.name);
  return selectedTemplate;
}

export const promptForMonorepo = async (): Promise<boolean> => {
  const { monorepo }: { monorepo: boolean } = await inquirer.prompt([
    {
      type: "confirm",
      name: "monorepo",
      message: "Would you like to use a monorepo with HardHat?",
    },
  ]);
  return monorepo;
};

const setupGitRepository = (path: string): void => {
  execSync(
    `cd ${path} && git init && git add . && git commit -m "Initial commit"`
  );
  console.log("Git repository initialized and first commit made.");
};

export const createMonorepo = async (
  projectName: string,
  template: Template
) => {
  fs.mkdirSync(projectName);
  execSync(`cd ${projectName} && npm init -y`);
  execSync(`cd ${projectName} && npm init -w ./packages/blockchain -y`);
  execSync(`cd ${projectName} && npm init -w ./packages/site -y`);

  // When we clone the repo we get a package.json file with all the dependencies, so these are not needed
  fs.rmSync(`${projectName}/packages/blockchain/package.json`);
  fs.rmSync(`${projectName}/packages/site/package.json`);

  // When we run `npm init -w ./packages/blockchain -y` we get a node_modules folder that's not needed
  const nodeModulesPath = `${projectName}/node_modules`;
  fs.rmSync(nodeModulesPath, { recursive: true });
  await cloneTemplate(template.id, `${projectName}/packages/site`);

  execSync(
    `git clone https://github.com/cxalem/hardhat-template.git ${projectName}/packages/blockchain`
  );
  const gitPath = `${projectName}/packages/blockchain/.git`;
  fs.rmSync(gitPath, { recursive: true });
};
