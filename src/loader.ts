import fs from "fs";
import dotenv from "dotenv";

export function loadEnv(path: string, required = true): Record<string, string> {
  if (!fs.existsSync(path)) {
    if (required) {
      throw new Error(`File not found: ${path}`);
    }
    return {};
  }

  try {
    const file = fs.readFileSync(path);
    return dotenv.parse(file);
  } catch {
    throw new Error(`Failed to parse ${path}`);
  }
}
