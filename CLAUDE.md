# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript implementation of Python's heapq module, providing a min-heap data structure that operates on standard JavaScript arrays using functional APIs rather than classes.

## Commands

### Development
- `bun install` or `make install` - Install dependencies
- `bun run build` or `make build` - Compile TypeScript to JavaScript in `lib/` directory
- `bun run clean` or `make clean` - Remove compiled output

### Testing
- `bun run test` or `make test` - Run all Jest tests
- `make test-watch` - Run tests in watch mode
- `jest ./test/utils.test.ts` - Run a specific test file

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

## TypeScript Configuration

- Target: ESNext with bundler module resolution
- Strict mode enabled with `noUncheckedIndexedAccess` and `noImplicitOverride`
- Output: `lib/` directory with declaration files and source maps
- `noEmit: true` in tsconfig but build script runs `tsc` to generate output
