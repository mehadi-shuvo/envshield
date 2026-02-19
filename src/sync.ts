import fs from "fs";
import { loadEnv } from "./loader";
import { logger } from "./logger";

interface SyncOptions {
  envPath: string;
  examplePath: string;
}
export function syncEnv(options: SyncOptions) {
  const { envPath, examplePath } = options;
  try {
    const example = loadEnv(examplePath);
    const env = loadEnv(envPath, false);

    const missing = Object.keys(example).filter((key) => !(key in env));

    if (missing.length === 0) {
      logger.success("Your .env is already in sync with .env.example.");
      return;
    }

    const currentContent = fs.existsSync(".env")
      ? fs.readFileSync(".env", "utf-8")
      : "";

    const needsNewline =
      currentContent.length > 0 && !currentContent.endsWith("\n");

    const additions = missing.map((k) => `${k}=`).join("\n");

    const output =
      (needsNewline ? "\n" : "") + "# Added by envshield\n" + additions + "\n";

    fs.appendFileSync(".env", output);

    logger.success(`Added ${missing.length} missing keys to .env.`);
    missing.forEach((k) => logger.dim(`  + ${k}`));
  } catch (err: any) {
    logger.error(err.message);
    process.exit(2);
  }
}
