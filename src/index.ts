#!/usr/bin/env node

import { Command } from "commander";
import {
  cloneTemplate,
  promptForMonorepo,
  promptForProjectDetails,
  promptForTemplate,
} from "./commands/create.js";
import fs from "fs";
import { execSync } from "child_process";

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
          fs.mkdirSync(projectName);
          execSync(`cd ${projectName} && npm init -y`);
          execSync(`cd ${projectName} && npm init -w ./packages/blockchain -y`);
          execSync(`cd ${projectName} && npm init -w ./packages/site -y`);

          // When we clone the repo we get a package.json file with all the dependencies, so these are not needed
          fs.rmSync(`${projectName}/packages/blockchain/package.json`);
          fs.rmSync(`${projectName}/packages/site/package.json`);

          // When we run `npm init -w ./packages/blockchain -y` we get a node_modules folder that's not needed
          const nodeModulesPath = `${projectName}/node_modules`;
          fs.rmSync(nodeModulesPath, { recursive: true });

          execSync(
            `git clone https://github.com/cxalem/hardhat-template.git ${projectName}/packages/blockchain`
          );
          const gitPath = `${projectName}/packages/blockchain/.git`;
          fs.rmSync(gitPath, { recursive: true });
          await cloneTemplate(template.id, `${projectName}/packages/site`);
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
