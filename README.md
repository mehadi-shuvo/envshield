# ENV SHIELD

**Protect your environment variables across the team**

A lightweight CLI tool that validates and syncs your `.env` files against `.env.example`. Never miss an environment variable again!

[![npm version](https://img.shields.io/npm/v/envshield.svg)](https://www.npmjs.com/package/@infocyph/envshield)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- ✅ **Validate** - Check if your `.env` matches `.env.example`
- 🔄 **Sync** - Automatically add missing keys from `.env.example` to `.env`
- 🚀 **CI Ready** - Clean output for continuous integration
- 🎨 **Beautiful Logs** - Colorful, readable output (auto-disabled in CI)
- 📦 **Zero Config** - Works out of the box with sensible defaults
- 🔧 **Type Safe** - Written in TypeScript with full type definitions

## Installation

```bash
# npm
npm install -D @infocyph/envshield

# yarn
yarn add -D @infocyph/envshield

# pnpm
pnpm add -D @infocyph/envshield
```

## Quick Start

1. Create a `.env.example` file with all required environment variables:

```bash
# .env.example
DATABASE_URL=
API_KEY=
NEXT_PUBLIC_APP_URL=
```

2. Run validation:

```bash
npx envshield check
```

3. Sync missing variables (adds empty entries to your `.env`):

```bash
npx envshield sync
```

## CLI Commands

### `check` - Validate environment variables

```bash
envshield check [options]

Options:
  -e, --env <path>      Path to env file (default: ".env")
  -x, --example <path>  Path to example file (default: ".env.example")
  --ci                  Run in CI mode (no colors)
  -h, --help           Display help
```

**Examples:**

```bash
# Basic validation
envshield check

# Custom file paths
envshield check -e .env.local -x .env.example

# CI mode (useful for GitHub Actions, etc.)
envshield check --ci
```

**Output:**

```bash
# ✅ Successful validation
[envshield] Validation passed: All keys are present and populated.

# ❌ Failed validation
[envshield] Environment validation failed.
[envshield] Missing Keys:
  - DATABASE_URL
  - API_KEY
[envshield] Empty Values:
  - NEXT_PUBLIC_APP_URL
Suggestion: Run `envshield sync` to add missing keys.
```

### `sync` - Add missing keys to .env

```bash
envshield sync [options]

Options:
  -e, --env <path>      Path to env file (default: ".env")
  -x, --example <path>  Path to example file (default: ".env.example")
  -h, --help           Display help
```

**Examples:**

```bash
# Basic sync
envshield sync

# Sync with custom files
envshield sync -e .env.local -x .env.example
```

**Output:**

```bash
# ✅ Already in sync
[envshield] Your .env is already in sync with .env.example.

# ✅ Successfully synced
[envshield] Added 3 missing keys to .env.
  + DATABASE_URL
  + API_KEY
  + NEXT_PUBLIC_APP_URL
```

**Resulting `.env` file:**

```bash
# Existing content
EXISTING_KEY=value

# Added by envshield
DATABASE_URL=
API_KEY=
NEXT_PUBLIC_APP_URL=
```

## Use Cases

### Pre-commit Hook

Add validation to your pre-commit hooks with husky:

```json
// .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx envshield check
```

### CI/CD Pipeline

```yaml
# .github/workflows/validate.yml
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

### Package.json Scripts

```json
{
  "scripts": {
    "validate:env": "envshield check",
    "sync:env": "envshield sync",
    "prepare": "envshield sync"
  }
}
```

## Why envshield?

- **Team Consistency** - Ensure all team members have the same environment variables
- **Debug Less** - Catch missing environment variables before they cause runtime errors
- **Onboarding** - New team members can quickly set up their environment
- **Deployment Safety** - Prevent failed deployments due to missing environment variables

## API Reference

You can also use envshield programmatically:

```typescript
import { validateEnv, syncEnv } from "envshield";

// Validate environment variables
validateEnv({
  envPath: ".env",
  examplePath: ".env.example",
});

// Sync missing keys
syncEnv({
  envPath: ".env",
  examplePath: ".env.example",
});
```

## Comparison

| Feature               | envshield | Other Tools |
| --------------------- | --------- | ----------- |
| Zero Configuration    | ✅        | ❌          |
| Sync Command          | ✅        | ❌          |
| CI Mode               | ✅        | ⚠️          |
| TypeScript Support    | ✅        | ⚠️          |
| Empty Value Detection | ✅        | ❌          |
| File Size             | < 10KB    | 100KB+      |

## License

MIT © [Mehadi Hasan](https://github.com/mehadihn)

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Made with ❤️ for the developer community**
