# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript implementation of Python's heapq module, providing a min-heap data structure that operates on standard JavaScript arrays using functional APIs rather than classes.

## Commands

### Development
- `bun install` or `make install` - Install dependencies
- `bun run build` - Build package using tsup (ESM output in `lib/`)
- `bun run dev` - Build in watch mode for development
- `bun run clean` - Remove the `lib/` build output directory

### Testing
- `bun test` - Run all tests using Bun's test runner
- `bun run test:watch` - Run tests in watch mode

### Version Management & Publishing
- `bun run changeset` - Create a new changeset (describe your changes for release)
- `bun run version` - Bump versions and update changelogs (usually automated via CI)
- `bun run release` - Build and publish to npm (usually automated via CI)

## Architecture

### Core Heap Implementation (`src/heap.ts`)

The library provides five main heap operations that mirror Python's heapq API:

- `heappush(heap, value, cmp?)` - Add element while maintaining heap invariant
- `heappop(heap, cmp?)` - Remove and return smallest element
- `heappushpop(heap, value, cmp?)` - Push then pop (more efficient than separate operations)
- `heapreplace(heap, value, cmp?)` - Pop then push (more efficient than separate operations)
- `heapify(heap, cmp?)` - Transform array into valid heap in-place

All operations accept an optional custom comparator function.

### Heap Utilities (`src/utils.ts`)

Contains the core heap algorithms:

- `siftDown(heap, index, cmp)` - Restore heap property by moving element down (used when parent > children)
- `siftUp(heap, index, cmp)` - Restore heap property by moving element up (used when child < parent)
- `defaultComparator(a, b)` - Default min-heap comparator (returns `a < b`)
- Helper functions use bitwise operations for performance:
  - Left child: `(index << 1) + 1`
  - Right child: `(index << 1) + 2`
  - Parent: `(index - 1) >> 1`

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
- `@nwthomas/heapq/heap` - Just heap functions
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

**Setup Required**: Add `NPM_TOKEN` to GitHub repository secrets for automated publishing.

## TypeScript Configuration

- Target: ESNext with Bundler module resolution
- Strict mode enabled with `noUncheckedIndexedAccess` and `noImplicitOverride`
- Output: `lib/` directory with declaration files and source maps
- `noEmit: true` in tsconfig (tsup handles actual compilation)
