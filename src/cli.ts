#!/usr/bin/env node

import { Command } from "commander";
import { syncEnv } from "./sync";
import { validateEnv } from "./validator";
import { setCI } from "./logger";
import packageJson from "../package.json";

const program = new Command();

program
  .name("envshield")
  .description("Protect and validate environment variables across your team")
  .version(packageJson.version, "-v, --version", "Display CLI version");

/*
|--------------------------------------------------------------------------
| CHECK COMMAND
|--------------------------------------------------------------------------
*/

program
  .command("check")
  .description("Validate environment variables against .env.example")
  .option("-e, --env <path>", "Path to env file", ".env")
  .option("-x, --example <path>", "Path to example file", ".env.example")
  .option("--ci", "Run in CI mode (disable colors)")
  .action((options) => {
    if (options.ci) {
      setCI(true);
    }

    validateEnv({
      envPath: options.env,
      examplePath: options.example,
    });
  });

/*
|--------------------------------------------------------------------------
| SYNC COMMAND
|--------------------------------------------------------------------------
*/

program
  .command("sync")
  .description("Append missing keys from .env.example into .env")
  .option("-e, --env <path>", "Path to env file", ".env")
  .option("-x, --example <path>", "Path to example file", ".env.example")
  .action((options) => {
    syncEnv({
      envPath: options.env,
      examplePath: options.example,
    });
  });

/*
|--------------------------------------------------------------------------
| HELP COMMAND
|--------------------------------------------------------------------------
*/

program
  .command("help")
  .description("Display help information")
  .action(() => {
    program.outputHelp();
  });

/*
|--------------------------------------------------------------------------
| CUSTOM HELP SECTION
|--------------------------------------------------------------------------
*/

program.addHelpText(
  "after",
  `
Examples:

  $ envshield check
  Validate .env against .env.example

  $ envshield check --env .env.local
  Validate a custom env file

  $ envshield sync
  Append missing keys to .env

  $ envshield check --ci
  Run validation in CI pipelines

Repository:
  https://github.com/mehadi-shuvo/envshield
`,
);

program.parse();
