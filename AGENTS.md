# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## Project Overview

This is a TypeScript implementation of Python's heapq module, providing a min-heap data structure that operates on standard JavaScript arrays using functional APIs rather than classes.

## Commands

### Development

- `make install` (or `make i`) - Install dependencies
- `make build` - Build package using tsup (ESM output in `lib/`)
- `make dev` - Build in watch mode for development
- `make clean` - Remove the `lib/` build output directory

### Testing

- `make test` - Run all tests using Bun's test runner
- `make test-watch` - Run tests in watch mode

### Code Formatting

- `make format` - Format all TypeScript files with Prettier
- `make format-check` - Check if files are formatted correctly

### Version Management & Publishing

- `make changeset` - Create a new changeset (describe your changes for release)
- `bun run version` - Bump versions and update changelogs (usually automated via CI)
- `bun run release` - Build and publish to npm (usually automated via CI)

## Architecture

### Core Heap Operations

The library provides five main heap operations that mirror Python's heapq API, each in its own file:

- `src/heapPush.ts` - `heappush(heap, value, cmp?)` - Add element while maintaining heap invariant
- `src/heapPop.ts` - `heappop(heap, cmp?)` - Remove and return smallest element
- `src/heapPushPop.ts` - `heappushpop(heap, value, cmp?)` - Push then pop (more efficient than separate operations)
- `src/heapReplace.ts` - `heapreplace(heap, value, cmp?)` - Pop then push (more efficient than separate operations)
- `src/heapify.ts` - `heapify(heap, cmp?)` - Transform array into valid heap in-place

All operations accept an optional custom comparator function.

### Heap Utilities (`src/utils.ts`)

Contains the core heap algorithms (prefixed with `_` to indicate internal use):

- `_siftDown(heap, index, cmp)` - Restore heap property by moving element down (used when parent > children)
- `_siftUp(heap, index, cmp)` - Restore heap property by moving element up (used when child < parent)
- `_defaultComparator(a, b)` - Default min-heap comparator (returns `a < b`)
- Helper functions use bitwise operations for performance:
    - `getLeftChildIndex(index)` - Left child: `(index << 1) + 1`
    - `getRightChildIndex(index)` - Right child: `(index << 1) + 2`
    - `getParentIndex(index)` - Parent: `(index - 1) >> 1`

### Type System (`src/types.ts`)

- `Comparator<T>` - Function type `(a: T, b: T) => boolean` for custom ordering

### Design Principles

1. **Functional API**: Operations mutate arrays in-place (like Python's heapq) rather than using class instances
2. **Min-heap by default**: Smallest element at index 0, customizable via comparator
3. **Zero-based indexing**: Binary heap stored in array using standard index calculations
4. **Custom comparators**: All operations support optional comparator for custom ordering (e.g., max-heap, priority queues)

## Build System

This project uses **tsup** (powered by esbuild) for building:

- Compiles TypeScript to ESM-only JavaScript in `lib/`
- Generates minified output for optimal bundle size
- Creates TypeScript declaration files (`.d.ts`) for type support
- Generates source maps for debugging
- Supports tree-shaking for consuming applications

### Package Exports

The package provides granular exports for better tree-shaking:

- `@nwthomas/heapq` - Main entry (all exports)
- `@nwthomas/heapq/heapify` - Just heapify function
- `@nwthomas/heapq/heapPop` - Just heappop function
- `@nwthomas/heapq/heapPush` - Just heappush function
- `@nwthomas/heapq/heapPushPop` - Just heappushpop function
- `@nwthomas/heapq/heapReplace` - Just heapreplace function
- `@nwthomas/heapq/types` - Just TypeScript types

## Release Workflow

This project uses **Changesets** for automated version management and publishing:

### Creating a Release

1. Make your code changes
2. Run `bun run changeset` to describe your changes:
    - Select version bump type (patch/minor/major following semver)
    - Write a summary (used in CHANGELOG.md)
3. Commit the changeset file (`.changeset/*.md`) with your code
4. Push to `main` branch

### Automated Publishing

When code is pushed to `main`:

1. GitHub Actions runs tests and builds the package
2. If changesets are detected, a "Version Packages" PR is created/updated
3. Merging the Version Packages PR triggers:
    - Version bump in `package.json`
    - `CHANGELOG.md` update with changeset summaries
    - Automatic publish to npm
    - GitHub release creation

**Setup**: Uses npm trusted publishing via OIDC (no NPM_TOKEN secret needed). Configured at https://www.npmjs.com/package/@nwthomas/heapq/access

## Code Quality

### TypeScript Configuration

- Target: ESNext with Bundler module resolution
- Strict mode enabled with `noUncheckedIndexedAccess` and `noImplicitOverride`
- Output: `lib/` directory with declaration files and source maps
- `noEmit: true` in tsconfig (tsup handles actual compilation)

### Prettier Formatting

- Configuration: `.prettierrc.json`
    - 4 spaces for indentation
    - Semicolons enabled
    - Double quotes
    - Trailing commas everywhere
- Format on save: Configure in Cursor/VS Code settings
- Ignored files: `.prettierignore` (build output, node_modules, etc.)
