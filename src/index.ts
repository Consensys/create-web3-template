#!/usr/bin/env node

import { Command } from "commander";
import {
  cloneTemplate,
  createMonorepo,
  promptForMonorepo,
  promptForProjectDetails,
  promptForTemplate,
} from "./utils/index.js";

async function main() {
  const program = new Command()
    .name("create-web3-template")
    .description("Web3 starter template CLI tool.")
    .arguments("[project-name]")
    .action(async (args: string) => {
      try {
        const projectName = await promptForProjectDetails(args);
        const template = await promptForTemplate();
        if (!template) throw new Error("Template not found");
        const isMonorepo = await promptForMonorepo();
        if (isMonorepo) {
          createMonorepo(projectName, template);
        } else {
          await cloneTemplate(template.id, projectName);
        }
      } catch (error) {
        console.error("An error occurred while creating the project:", error);
      }
    })
    .version("0.0.2");

  program.parse(process.argv);
}

main();
