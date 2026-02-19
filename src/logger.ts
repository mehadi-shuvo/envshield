import pc from "picocolors";

let isCI = false;

export function setCI(value: boolean) {
  isCI = value;
}

function format(message: string, color?: (str: string) => string) {
  if (isCI || !color) return `[envshield] ${message}`;
  return `${pc.bold(pc.blue("[envshield]"))} ${color(message)}`;
}

export const logger = {
  info(msg: string) {
    console.log(format(msg, pc.cyan));
  },

  success(msg: string) {
    console.log(format(msg, pc.green));
  },

  warn(msg: string) {
    console.warn(format(msg, pc.yellow));
  },

  error(msg: string) {
    console.error(format(msg, pc.red));
  },

  dim(msg: string) {
    console.log(isCI ? msg : pc.dim(msg));
  },
};
