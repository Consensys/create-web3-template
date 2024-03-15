#!/usr/bin/env node

import { Command } from "commander";
import { cloneTemplate, promptForProjectDetails, promptForTemplate } from "./commands/create.js";

async function main() {
  const program = new Command()
    .name("create-web3-template")
    .description("NextJS web3 starter template CLI tool.")
    .arguments("[project-name]")
    .action(async (args: string) => {
      try {
        const projectName = await promptForProjectDetails(args);
        const template = await promptForTemplate();
        if (!template) throw new Error("Template not found");
        await cloneTemplate(template.id, projectName);
      } catch (error) {
        console.error("An error occurred while creating the project:", error);
      }
    })
    .version("0.0.1");

  program.parse(process.argv);
}

main();
