#!/usr/bin/env node

import { Command } from "commander";
import { createProject } from "./utils/index.js";

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
