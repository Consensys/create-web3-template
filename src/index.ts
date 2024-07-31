#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs";
import { promptForProjectDetails } from "./utils/index.js";
import {
  BLOCKCHAIN_TOOLING_CHOICES,
  FRAMEWORK_CHOICES,
  PACAKGE_MANAGER_CHOICES,
} from "./constants/index.js";

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
    )?.value,
  };

  fs.mkdirSync(`${process.cwd()}/${projectName}`);
  fs.writeFileSync(
    `${process.cwd()}/${projectName}/web3-template.config.json`,
    JSON.stringify(options, null, 2)
  );
};

async function main() {
  const program = new Command()
    .name("create-web3-template")
    .description("Web3 starter template CLI tool.")
    .arguments("[project-name]")
    .action((args: string) => promptForOptions(args))
    .version("0.0.2");
  program.parse(process.argv);
}

main().catch((error) => {
  console.error("An unexpected error occurred:", error);
});
