import inquirer from "inquirer";
import { execSync } from "child_process";
import fs from "fs";

const TEMPLATES = [
  {
    title: "Next Web3 Starter",
    id: "next-web3-starter",
    repo_url: "https://github.com/Consensys/next-web3-starter.git",
  },
  {
    title: "React Web3 Starter",
    id: "react-web3-starter",
    repo_url: "https://github.com/Consensys/react-web3-starter.git",
  },
] as const;

export async function cloneTemplate(templateId: string, path: string) {
  const template = TEMPLATES.find((t) => t.id === templateId);
  if (!template) {
    throw new Error("Template not found");
  }

  switch (template.id) {
    case "next-web3-starter":
      if (!template.repo_url)
        throw new Error("Repository URL not defined for RAD Starter");

      execSync(`git clone ${template.repo_url} ${path}`);

      const packageJsonPath = `${path}/package.json`;
      const packageJson = fs.readFileSync(packageJsonPath, "utf-8");
      const newPackageJson = packageJson.replace(
        /@consensys\/web3-starter/g,
        path.split("/")[0]
      );
      fs.writeFileSync(packageJsonPath, newPackageJson);

      removeGitFolder(path);
      execSync(
        `cd ${path} && git init && git add . && git commit -m "Initial commit"`
      );

      break;
    case "react-web3-starter":
      if (!template.repo_url)
        throw new Error("Repository URL not defined for RAD Starter");
      execSync(`git clone ${template.repo_url} ${path}`);
      const reactPackageJsonPath = `${path}/package.json`;
      const reactPackageJson = fs.readFileSync(reactPackageJsonPath, "utf-8");
      const newReactPackageJson = reactPackageJson.replace(
        /@consensys\/react-web3-starter/g,
        path
      );
      fs.writeFileSync(reactPackageJsonPath, newReactPackageJson);
      removeGitFolder(path);
      execSync(`cd ${path} git init`);
      execSync(`cd ${path} && git add . && git commit -m "Initial commit"`);
      break;
    default:
      throw new Error("Unhandled template type");
  }
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
        default: 'my-web3-project'
      },
    ]);
    console.log("Creating project with name:", projectName);
    return projectName;
  }
  return args;
}

export async function promptForTemplate() {
  const { template }: { template: string } = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "Please specify a template: ",
      choices: TEMPLATES.map((template) => template.title),
    },
  ]);
  console.log("Creating project with template:", template);
  return TEMPLATES.find((t) => t.title === template);
}

export const promptForMonorepo = async () => {
  const { monorepo }: { monorepo: boolean } = await inquirer.prompt([
    {
      type: "confirm",
      name: "monorepo",
      message: "Would you like to use a monorepo with HardHat?",
    },
  ]);
  return monorepo;
};
