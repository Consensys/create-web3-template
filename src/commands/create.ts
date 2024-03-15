import inquirer from "inquirer";
import { execSync } from "child_process";

const templates = [
  {
    title: "Next Web3 Starter",
    id: "next-web3-starter",
    repo_url: "https://github.com/Consensys/next-web3-starter.git",
  },
  { title: "Vite + Wagmi + Viem", id: "vite-wagmi-viem", repo_url: "" },
] as const;

export async function cloneTemplate(templateId: string, projectName: string) {
  const template = templates.find((t) => t.id === templateId);
  if (!template) {
    throw new Error("Template not found");
  }

  switch (template.id) {
    case "next-web3-starter":
      if (!template.repo_url)
        throw new Error("Repository URL not defined for RAD Starter");
      execSync(`git clone ${template.repo_url} ${projectName}`);
      console.log("Project created successfully.");
      break;
    case "vite-wagmi-viem":
      console.log("Creating a Vite + Wagmi + Viem project");
      // TO-DO: Implement the logic for cloning or setting up this project
      break;
    default:
      throw new Error("Unhandled template type");
  }
}

export async function promptForProjectDetails(args: string) {
  if (!args) {
    const { projectName } = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "Please specify a project name: ",
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
      choices: templates.map((template) => template.title),
    },
  ]);
  console.log("Creating project with template:", template);
  return templates.find((t) => t.title === template);
}