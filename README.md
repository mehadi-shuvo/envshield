# EnvShield

> Protect and manage environment variables across your team.

**EnvShield** is a lightweight CLI tool that validates and synchronizes `.env` files against `.env.example`, ensuring every developer and deployment environment has the required variables.

<<<<<<< HEAD
[![npm version](https://www.npmjs.com/package/@infocyph/envshield)](https://www.npmjs.com/package/@infocyph/envshield)
=======
Never miss an environment variable again.

[![npm version](https://img.shields.io/npm/v/@infocyph/envshield.svg)](https://www.npmjs.com/package/@infocyph/envshield)
>>>>>>> 2eb1cf3 (fix: readme.md content)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

# Features

- ✅ **Validation** — Check if `.env` matches `.env.example`
- 🔄 **Syncing** — Automatically add missing variables
- 🚀 **CI Friendly** — Clean output for CI pipelines
- 🎨 **Readable Logs** — Colorful and structured CLI output
- ⚡ **Zero Configuration** — Works instantly with defaults
- 🧩 **TypeScript Ready** — Full type definitions included

---

# Installation

Install as a development dependency.

```bash
npm install -D @infocyph/envshield
```

or

```bash
yarn add -D @infocyph/envshield
```

or

```bash
pnpm add -D @infocyph/envshield
```

---

# Quick Start

### 1️⃣ Create `.env.example`

Define all required environment variables.

```bash
DATABASE_URL=
API_KEY=
NEXT_PUBLIC_APP_URL=
```

---

### 2️⃣ Validate your environment

```bash
npx envshield check
```

EnvShield will detect:

- missing variables
- empty values

---

### 3️⃣ Sync missing variables

```bash
npx envshield sync
```

Missing variables will automatically be added to `.env`.

---

# CLI Commands

## `check`

Validate your `.env` against `.env.example`.

```bash
envshield check [options]
```

### Options

| Option          | Description                   | Default        |
| --------------- | ----------------------------- | -------------- |
| `-e, --env`     | Path to env file              | `.env`         |
| `-x, --example` | Path to example file          | `.env.example` |
| `--ci`          | Disable colored output for CI | —              |

### Example

```bash
envshield check
```

Custom files:

```bash
envshield check -e .env.local -x .env.example
```

CI pipeline:

```bash
envshield check --ci
```

---

## `sync`

Append missing keys from `.env.example` to `.env`.

```bash
envshield sync [options]
```

### Options

| Option          | Description          | Default        |
| --------------- | -------------------- | -------------- |
| `-e, --env`     | Path to env file     | `.env`         |
| `-x, --example` | Path to example file | `.env.example` |

### Example

```bash
envshield sync
```

Custom files:

```bash
envshield sync -e .env.local -x .env.example
```

---

# Example Output

### Successful Validation

```
[envshield] Validation passed: All keys are present and populated.
```

### Failed Validation

```
[envshield] Environment validation failed.

Missing Keys:
  - DATABASE_URL
  - API_KEY

Empty Values:
  - NEXT_PUBLIC_APP_URL

Suggestion: Run `envshield sync`
```

---

# Example `.env` After Sync

Before:

```
EXISTING_KEY=value
```

After running:

```
envshield sync
```

Result:

```
EXISTING_KEY=value

DATABASE_URL=
API_KEY=
NEXT_PUBLIC_APP_URL=
```

---

# Common Use Cases

## Pre-commit Hooks

Prevent commits with missing environment variables.

Example using **Husky**:

```bash
npx envshield check
```

---

## CI/CD Validation

Example GitHub Action:

```yaml
name: Validate Environment Variables

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3

      - run: npm ci
      - run: npx envshield check --ci
```

---

## Package.json Scripts

```json
{
  "scripts": {
    "env:check": "envshield check",
    "env:sync": "envshield sync",
    "prepare": "envshield sync"
  }
}
```

---

# Why EnvShield?

Environment variables often cause problems such as:

- Missing variables
- Empty values
- Different setups across developers
- Deployment failures

EnvShield solves these problems by providing:

- Fast validation
- Automatic synchronization
- CI-friendly workflows

---

# Programmatic Usage

EnvShield can also be used inside Node.js scripts.

```ts
import { validateEnv, syncEnv } from "@infocyph/envshield";

validateEnv({
  envPath: ".env",
  examplePath: ".env.example",
});

syncEnv({
  envPath: ".env",
  examplePath: ".env.example",
});
```

---

# Feature Comparison

| Feature               | EnvShield | Typical Tools |
| --------------------- | --------- | ------------- |
| Zero Configuration    | ✅        | ❌            |
| Sync Command          | ✅        | ❌            |
| Empty Value Detection | ✅        | ❌            |
| CI Friendly           | ✅        | ⚠️            |
| TypeScript Support    | ✅        | ⚠️            |
| Lightweight           | <10KB     | 100KB+        |

---

# Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```
git checkout -b feature/new-feature
```

3. Commit your changes

```
git commit -m "Add new feature"
```

4. Push your branch

```
git push origin feature/new-feature
```

5. Open a Pull Request

---

# License

MIT © Mehadi Hasan

---

⭐ If you find this project helpful, consider giving it a star on GitHub.
