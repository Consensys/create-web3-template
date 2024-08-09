import inquirer from "inquirer";
import { exec } from "child_process";
import { promises as fs } from "fs";
import { TEMPLATES } from "../templates.js";
import path from "path";
import util from "util";

const execAsync = util.promisify(exec);

const validateTemplateExists = (input: string): void => {
  if (!input) {
    throw new Error("Template not found");
  }
};

export const updatePackageJson = async (
  projectPath: string,
  packageName: string
): Promise<void> => {
  try {
    if (!projectPath || !packageName) {
      throw new Error(
        "Invalid input: projectPath and packageName are required"
      );
    }

    const packageJsonPath = path.join(projectPath, "package.json");
    const packageJsonContent = await fs.readFile(packageJsonPath, "utf-8");
    const packageJson = JSON.parse(packageJsonContent);
    packageJson.name = path.basename(projectPath);

    const newPackageJsonContent = JSON.stringify(packageJson, null, 2);
    await fs.writeFile(packageJsonPath, newPackageJsonContent);

    console.log(
      `Package name updated to '${packageJson.name}' in ${packageJsonPath}`
    );
    return packageJson.name;
  } catch (error) {
    console.error(`updatePackageJson: Failed to update package.json: ${error}`);
    throw error; // Re-throw the error to ensure the caller is aware of the failure
  }
};

export const removeGitFolder = async (
  projectPath: string
): Promise<boolean | unknown> => {
  const gitPath = path.join(projectPath, ".git");
  try {
    await fs.rm(gitPath, { recursive: true });
    return true;
  } catch (err) {
    console.error("Error removing .git folder:", err);
    return err;
  }
};

export const setupGitRepository = async (
  projectPath: string
): Promise<void> => {
  await execAsync(
    `cd ${projectPath} && git init && git add . && git commit -m "Initial commit"`
  );
  console.log("Git repository initialized and first commit made.");
};

export const cloneAndSetupTemplate = async (
  template: Template,
  projectPath: string
): Promise<void> => {
  try {
    validateTemplateExists(template.id);

    await execAsync(`git clone ${template.repo_url} ${projectPath}`);
    await updatePackageJson(projectPath, template.packageName);
    await removeGitFolder(projectPath);
    await setupGitRepository(projectPath);
  } catch (error) {
    console.error(
      `cloneAndSetupTemplate: Error setting up the template: ${error}`
    );
    throw error;
  }
};

export const cloneTemplate = async (
  templateId: string,
  projectPath: string
): Promise<Template> => {
  const template = TEMPLATES.find((t) => t.id === templateId) as Template;
  if (!template) {
    throw new Error("Template not found");
  }
  await cloneAndSetupTemplate(template, projectPath);
  return template;
};

export const promptForProjectDetails = async (
  args: string
): Promise<string> => {
  if (!args) {
    const { projectName } = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "Please specify a name for your project: ",
        validate: (input) => (input ? true : "Project name cannot be empty"),
      },
    ]);
    console.log("Creating project with name:", projectName);
    return projectName;
  }
  return args;
};

export const promptForTemplate = async (): Promise<Template> => {
  const { template }: { template: string } = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "Please specify a template: ",
      choices: TEMPLATES.map((template) => template.name),
    },
  ]);
  const selectedTemplate = TEMPLATES.find(
    (t) => t.name === template
  ) as Template;
  console.log("Creating project with template:", selectedTemplate.name);
  return selectedTemplate;
};

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

export const createMonorepo = async (
  projectName: string,
  template: Template
): Promise<void> => {
  await fs.mkdir(projectName);
  await execAsync(`cd ${projectName} && npm init -y`);
  await execAsync(`cd ${projectName} && npm init -w ./packages/blockchain -y`);
  await execAsync(`cd ${projectName} && npm init -w ./packages/site -y`);

  await fs.rm(path.join(projectName, "packages", "blockchain", "package.json"));
  await fs.rm(path.join(projectName, "packages", "site", "package.json"));

  await fs.rm(path.join(projectName, "node_modules"), { recursive: true });
  await cloneTemplate(template.id, path.join(projectName, "packages", "site"));

  await createGitIgnore(projectName);

  await execAsync(
    `git clone https://github.com/cxalem/hardhat-template.git ${path.join(
      projectName,
      "packages",
      "blockchain"
    )}`
  );
  await fs.rm(path.join(projectName, "packages", "blockchain", ".git"), {
    recursive: true,
  });
};

export const createGitIgnore = async (projectPath: string): Promise<void> => {
  const gitIgnorePath = path.join(projectPath, ".gitignore");
  const gitIgnoreContent = `node_modules\n`;

  try {
    await fs.writeFile(gitIgnorePath, gitIgnoreContent);
  } catch (err) {
    console.error("Error creating .gitignore file:", err);
  }
};
