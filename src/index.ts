#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import {
  cloneTemplate,
  createMonorepo,
  promptForMonorepo,
  promptForProjectDetails,
} from "./utils/index.js";
import { TEMPLATES } from "./templates.js";

async function promptForFramework(): Promise<string> {
  const { framework }: { framework: string } = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: "Please select the framework you want to use:",
      choices: ["React (with Vite)", "Next.js"],
    },
  ]);
  return framework;
}

async function promptForTooling(framework: string): Promise<string> {
  const toolingChoices =
    framework === "Next.js"
      ? ["HardHat", "None"]
      : ["HardHat", "Foundry", "None"];
  const { tooling }: { tooling: string } = await inquirer.prompt([
    {
      type: "list",
      name: "tooling",
      message: "Would you like to use HardHat or Foundry?",
      choices: toolingChoices,
    },
  ]);
  return tooling;
}

async function handleProjectCreation(args: string): Promise<void> {
  try {
    // Prompt user for project details if not provided
    const projectName = await promptForProjectDetails(args);

    // Prompt user for framework selection
    const framework = await promptForFramework();
    console.log(`Selected framework: ${framework}`);

    // Prompt user for tooling selection
    const tooling = await promptForTooling(framework);
    console.log(`Selected tooling: ${tooling}`);

    // Determine the template ID based on the framework and tooling
    let templateId: string;
    if (framework === "React (with Vite)" && tooling === "Foundry") {
      templateId = "foundry-starter";
    } else {
      templateId =
        framework === "React (with Vite)"
          ? "react-web3-starter"
          : "next-web3-starter";
    }
    const template = TEMPLATES.find((t) => t.id === templateId);
    if (!template) {
      throw new Error("Template not found");
    }

    // Proceed based on the selected tooling
    if (tooling === "HardHat") {
      await createMonorepo(projectName, template);
    } else if (tooling === "Foundry") {
      await cloneTemplate(template.id, projectName);
    } else {
      await cloneTemplate(template.id, projectName);
    }
  } catch (error) {
    console.error("An error occurred while creating the project:", error);
  }
}

async function main() {
  const program = new Command()
    .name("create-web3-template")
    .description("Web3 starter template CLI tool.")
    .arguments("[project-name]")
    .action((args: string) => handleProjectCreation(args))
    .version("0.0.2");

  program.parse(process.argv);
}

main().catch((error) => {
  console.error("An unexpected error occurred:", error);
});
