import { loadEnv } from "./loader";
import { logger } from "./logger";

interface ValidateOptions {
  envPath: string;
  examplePath: string;
}

export function validateEnv(options: ValidateOptions) {
  const { envPath, examplePath } = options;
  try {
    const example = loadEnv(examplePath);
    const env = loadEnv(envPath);

    const missing: string[] = [];
    const empty: string[] = [];

    for (const key of Object.keys(example)) {
      if (!(key in env)) {
        missing.push(key);
      } else if (!env[key] || env[key].trim() === "") {
        empty.push(key);
      }
    }

    if (missing.length === 0 && empty.length === 0) {
      logger.success("Validation passed: All keys are present and populated.");
      return;
    }

    logger.error("Environment validation failed.");

    if (missing.length > 0) {
      logger.info("Missing Keys:");
      missing.forEach((k) => logger.warn(`  - ${k}`));
    }

    if (empty.length > 0) {
      logger.info("Empty Values:");
      empty.forEach((k) => logger.warn(`  - ${k}`));
    }

    logger.dim("Suggestion: Run `envshield sync` to add missing keys.");

    process.exit(1);
  } catch (err: any) {
    logger.error(err.message);
    process.exit(2);
  }
}
