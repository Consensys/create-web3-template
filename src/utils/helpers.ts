import { exec } from "child_process";
import util from "util";
import {
  BLOCKCHAIN_TOOLING_CHOICES,
  FRAMEWORK_CHOICES,
  PACAKGE_MANAGER_CHOICES,
} from "../constants/index.js";
import { promises as fs } from "fs";
import inquirer from "inquirer";
import path from "path";

const execAsync = util.promisify(exec);

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

const createDirectory = async (projectName: string) => {
  try {
    await fs.mkdir(projectName);
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};

const pathOrProjectName = (projectName: string, path?: string) => {
  return path ? path : projectName;
};

const createNextApp = async (options: ProjectOptions, path?: string) => {
  console.log("Creating Next.js project...");
  try {
    const { projectName, packageManager } = options;

    const command = `npx create-next-app ${pathOrProjectName(
      projectName,
      path
    )} --ts --tailwind --eslint --app --src-dir --import-alias "@/*" ${usePackageManager(
      packageManager
    )}`;
    await execAsync(command);

    console.log("Next.js project created successfully!");
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};

const createReactApp = async (options: ProjectOptions, path?: string) => {
  console.log("Creating React project...");
  try {
    const { projectName, packageManager } = options;

    switch (packageManager) {
      case "npm":
        console.log("Creating project with npm");
        if (path) {
          await execAsync(
            `cd ${path} && npm init vite@latest . -- --template react-ts`
          );
        } else {
          await execAsync(
            `npm init vite@latest ${projectName} -- --template react-ts`
          );
        }
        break;
      case "yarn":
        console.log("Creating project with yarn");
        if (path) {
          await execAsync(
            `cd ${path} && yarn create vite . --template react-ts`
          );
        } else {
          await execAsync(
            `yarn create vite ${projectName} --template react-ts`
          );
        }
        break;
      case "pnpm":
        console.log("Creating project with pnpm");
        if (path) {
          await execAsync(
            `cd ${path} && pnpm create vite . --template react-ts`
          );
        }
        break;
      default:
        break;
    }
    console.log("React project created successfully!");
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
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
