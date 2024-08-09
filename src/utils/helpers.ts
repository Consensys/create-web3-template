import { exec } from "child_process";
import util from "util";
import {
  BLOCKCHAIN_TOOLING_CHOICES,
  FRAMEWORK_CHOICES,
  PACAKGE_MANAGER_CHOICES,
} from "../constants/index.js";
import fs from "fs";
import inquirer from "inquirer";

const execAsync = util.promisify(exec);

const usePackageManager = (packageManager: string) => {
  switch (packageManager) {
    case "npm":
      return "--use-npm";
    case "yarn":
      return "--use-yarn";
    case "pnpm":
      return "--use-pnpm";
    default:
      return "--use-npm";
  }
};

const promptForProjectDetails = async (args: string): Promise<string> => {
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

async function promptForFramework(): Promise<string> {
  const frameworkChoice = FRAMEWORK_CHOICES.map((choice) => choice.name);
  const { framework }: { framework: string } = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: "Please select the framework you want to use:",
      choices: frameworkChoice,
    },
  ]);
  console.log(`Selected framework: ${framework}`);

  return framework;
}

async function promptForTooling(): Promise<string> {
  const toolingChoice = BLOCKCHAIN_TOOLING_CHOICES.map((choice) => choice.name);
  const { tooling }: { tooling: string } = await inquirer.prompt([
    {
      type: "list",
      name: "tooling",
      message: "Would you like to use HardHat or Foundry?",
      choices: toolingChoice,
    },
  ]);
  console.log(`Selected tooling: ${tooling}`);

  return tooling;
}

async function promptForPackageManager(): Promise<string> {
  const packageManagerChoice = PACAKGE_MANAGER_CHOICES.map(
    (choice) => choice.name
  );
  const { packageManager }: { packageManager: string } = await inquirer.prompt([
    {
      type: "list",
      name: "packageManager",
      message: "Please select the package manager you want to use:",
      choices: packageManagerChoice,
    },
  ]);
  console.log(`Selected package manager: ${packageManager}`);

  return packageManager;
}

const createDirectory = async (projectName: string) => {
  try {
    fs.mkdirSync(projectName);
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};

export const createNextApp = async (options: ProjectOptions) => {
  try {
    const { projectName, packageManager } = options;

    const command = `npx create-next-app ${projectName} --ts --tailwind --eslint --app --src-dir --import-alias "@/*" ${usePackageManager(
      packageManager
    )}`;
    await execAsync(command);

    console.log("Next.js project created successfully!");
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};

export const createReactApp = async (options: ProjectOptions) => {
  try {
    const { projectName, packageManager } = options;

    switch (packageManager) {
      case "npm":
        console.log("Creating project with npm");
        await execAsync(
          `npm init vite@latest ${projectName} -- --template react-ts`
        );
        break;
      case "yarn":
        console.log("Creating project with yarn");
        await execAsync(`yarn create vite ${projectName} --template react-ts`);
        break;
      case "pnpm":
        console.log("Creating project with pnpm");
        await execAsync(`pnpm create vite ${projectName} --template react-ts`);
        break;
      default:
        break;
    }

    console.log("React project created successfully!");
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};

export const promptForOptions = async (args: string) => {
  const projectName = await promptForProjectDetails(args);
  const framework = await promptForFramework();
  const tooling = await promptForTooling();
  const packageManager = await promptForPackageManager();

  const options = {
    projectName: projectName,
    framework: FRAMEWORK_CHOICES.find((choice) => choice.name === framework)
      ?.value,
    blockchain_tooling: BLOCKCHAIN_TOOLING_CHOICES.find(
      (choice) => choice.name === tooling
    )?.value,
    packageManager: PACAKGE_MANAGER_CHOICES.find(
      (choice) => choice.name === packageManager
    )?.value!,
  };

  return options;
};
