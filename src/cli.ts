#!/usr/bin/env node

import { Command } from "commander";
import { syncEnv } from "./sync";
import { validateEnv } from "./validator";
import { setCI } from "./logger";
import packageJson from "../package.json";

const program = new Command();

program
  .name("envshield")
  .description("Protect your environment variables across the team")
  .version(packageJson.version);

program
  .command("check")
  .description("Validate environment variables")
  .option("-e, --env <path>", "Path to env file", ".env")
  .option("-x, --example <path>", "Path to example file", ".env.example")
  .option("--ci", "Run in CI mode (no colors)")
  .action((options) => {
    if (options.ci) {
      setCI(true);
    }

    validateEnv({
      envPath: options.env,
      examplePath: options.example,
    });
  });

program
  .command("sync")
  .description("Append missing keys from example file to env file")
  .option("-e, --env <path>", "Path to env file", ".env")
  .option("-x, --example <path>", "Path to example file", ".env.example")
  .action((options) => {
    syncEnv({
      envPath: options.env,
      examplePath: options.example,
    });
  });

program.parse();
