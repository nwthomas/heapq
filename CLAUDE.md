# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@nwthomas/heapq`, a TypeScript implementation of Python's heapq module. The project is an npm package that provides heap queue (priority queue) algorithms.

## Build & Development Commands

- `bun install` - Install dependencies
- `bun run build` - Clean and compile TypeScript to `lib/` directory
- `bun run clean` - Remove the `lib/` build output directory
- `bun test` - Run tests (using Bun's built-in test runner)

### Build Process

The build process uses TypeScript compiler (tsc) to:
- Compile TypeScript from `src/` to `lib/`
- Generate declaration files (`.d.ts`) in `lib/types/`
- Generate declaration maps for IDE support

The `prepack` script automatically runs the build before publishing to npm.

## Runtime & Tooling

This project uses **Bun** instead of Node.js/npm/pnpm:

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun install` instead of `npm install`
- Use `bun run <script>` instead of `npm run <script>`
- Bun automatically loads .env files (no dotenv package needed)

### Bun-Specific APIs (if needed in future)

- `Bun.file` for file operations (prefer over `node:fs`)
- `bun:sqlite` for SQLite (not `better-sqlite3`)
- `bun:test` for testing with `import { test, expect } from "bun:test"`

## TypeScript Configuration

The project uses strict TypeScript settings:
- Target: ESNext
- Module: Preserve (for modern module output)
- Strict mode enabled with additional safety checks:
  - `noUncheckedIndexedAccess: true`
  - `noImplicitOverride: true`
  - `noFallthroughCasesInSwitch: true`

## Package Structure

- **Entry point**: `src/index.ts`
- **Build output**: `lib/` (gitignored, generated on build)
- **Published files**: Only `lib/**/*` is included in the npm package
- **Type definitions**: Generated automatically in `lib/index.d.ts`

## Testing

Tests should be placed in files matching `*.test.ts` pattern. Use Bun's test framework:

```typescript
import { test, expect } from "bun:test";

test("example test", () => {
  expect(true).toBe(true);
});
```

Run tests with `bun test`.
