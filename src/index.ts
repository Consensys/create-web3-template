#!/usr/bin/env node

import { Command } from "commander";
import {
  createNextApp,
  createReactApp,
  promptForOptions,
} from "./utils/helpers.js";

const createProject = async (args: string) => {
  const options = await promptForOptions(args);
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

async function main() {
  const program = new Command()
    .name("create-web3-template")
    .description("Web3 starter template CLI tool.")
    .arguments("[project-name]")
    .action((args: string) => createProject(args))
    .version("0.0.2");
  program.parse(process.argv);
}

main().catch((error) => {
  console.error("An unexpected error occurred:", error);
});
