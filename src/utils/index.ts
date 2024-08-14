import inquirer from "inquirer";
import { exec } from "child_process";
import { promises as fs } from "fs";
import path from "path";
import util from "util";
import {
  BLOCKCHAIN_TOOLING_CHOICES,
  FRAMEWORK_CHOICES,
  PACAKGE_MANAGER_CHOICES,
} from "../constants/index.js";
import { createReactApp } from "./vite.helpers.js";
import { createNextApp } from "./next.helpers.js";

export const execAsync = util.promisify(exec);

const promptForFramework = async (): Promise<string> => {
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
};

const promptForTooling = async (): Promise<string> => {
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
};

const promptForPackageManager = async (): Promise<string> => {
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

const promptForOptions = async (args: string) => {
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

const initializeMonorepo = async (options: ProjectOptions) => {
  const { projectName, packageManager } = options;
  console.log("Initializing monorepo...");

  if (packageManager === "pnpm") {
    await fs.writeFile(
      path.join(projectName, "pnpm-workspace.yaml"),
      `packages:
        - 'packages/*'`
    );
  }

  await fs.writeFile(path.join(projectName, ".gitignore"), `node_modules`);
  await execAsync(`cd ${projectName} && npm init -y`);
  await execAsync(`cd ${projectName} && npm init -w ./packages/blockchain -y`);
  await execAsync(`cd ${projectName} && npm init -w ./packages/site -y`);

  await fs.rm(path.join(projectName, "packages", "blockchain", "package.json"));
  await fs.rm(path.join(projectName, "packages", "site", "package.json"));
  await fs.rm(path.join(projectName, "node_modules"), { recursive: true });
};

const createHardhatProject = async (options: ProjectOptions) => {
  const { projectName, framework } = options;
  await fs.mkdir(projectName);

  console.log("Creating a project with HardHat...");

  await initializeMonorepo(options);
  await execAsync(
    `git clone https://github.com/cxalem/hardhat-template.git ${path.join(
      projectName,
      "packages",
      "blockchain"
    )}`
  );

  if (framework === "nextjs") {
    await createNextApp(options, path.join(projectName, "packages", "site"));
  } else {
    await createReactApp(options, path.join(projectName, "packages", "site"));
  }
};

const createFoundryProject = async (options: ProjectOptions) => {
  const { projectName, framework } = options;
  await fs.mkdir(projectName);

  console.log("Creating a project with Foundry...");

  await initializeMonorepo(options);
  if (framework === "nextjs") {
    await createNextApp(options, path.join(projectName, "packages", "site"));
  } else {
    await createReactApp(options, path.join(projectName, "packages", "site"));
  }

  await execAsync(`
    cd ${projectName}/packages/blockchain && forge init . --no-commit
    `);
};

export const pathOrProjectName = (
  projectName: string,
  projectPath?: string
) => {
  return projectPath ? projectPath : projectName;
};

export const updatePackageJsonDependencies = async (
  dependencies: Record<string, string>,
  projectPath: string
) => {
  const packageJsonPath = path.join(projectPath, "package.json");
  const packageJsonContent = await fs.readFile(packageJsonPath, "utf-8");
  const packageJson = JSON.parse(packageJsonContent);

  packageJson.dependencies = {
    ...packageJson.dependencies,
    ...dependencies,
  };

  const newPackageJsonContent = JSON.stringify(packageJson, null, 2);
  await fs.writeFile(packageJsonPath, newPackageJsonContent, "utf-8");

  console.log("Dependencies added to package.json");
};

export const createWagmiConfigFile = async (projectPath: string) => {
  await fs.writeFile(
    path.join(projectPath, "wagmi.config.ts"),
    `
import { http, createConfig } from "wagmi";
import { lineaTestnet } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const config = createConfig({
  chains: [lineaTestnet],
  connectors: [metaMask()],
  transports: {
    [lineaTestnet.id]: http(),
  },
});
`
  );
};

export const usePackageManager = (packageManager: string) => {
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

export const createProject = async (args: string) => {
  const options = await promptForOptions(args);

  if (options.blockchain_tooling === "hardhat") {
    createHardhatProject(options);
    return;
  }

  if (options.blockchain_tooling === "foundry") {
    createFoundryProject(options);
    return;
  }

  switch (options.framework) {
    case "nextjs":
      await createNextApp(options);
      break;
    case "react":
      await createReactApp(options);
      break;
    default:
      break;
  }
};
