# heapq 🥞

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/nwthomas/heapq)
[![Build](https://github.com/nwthomas/heapq/actions/workflows/publish.yml/badge.svg)](https://github.com/nwthomas/heapq/actions/workflows/publish.yml)
[![npm version](https://badge.fury.io/js/%40nwthomas%2Fheapq.svg)](https://www.npmjs.com/package/@nwthomas/heapq)

[![NPM](https://nodei.co/npm/@nwthomas/heapq.svg?data=d,s)](https://nodei.co/npm/@nwthomas/heapq/)

A TypeScript implementation of the Python [heapq](https://docs.python.org/3/library/heapq.html) module.

I got tired of not having a great heap module in the JavaScript standard library, and all of the ones on npm either haven't been touched in the better part of a decade or feel super sketchy.

This package supports both ESM and CJS with zero external dependencies, so you should be able to use it wherever you wish.

## Installation

You can install `@nwthomas/heapq` quickly.

With [bun](https://bun.com):

```bash
bun install @nwthomas/heapq
```

With [npm](https://nodejs.org):

```bash
npm install @nwthomas/heapq
```

With [pnpm](https://pnpm.io):

```bash
pnpm install @nwthomas/heapq
```

With [yarn](https://yarnpkg.com):

```bash
yarn install @nwthomas/heapq
```

It can also be really nice to alias this package in your `package.json` file to just use `heapq` as the import everywhere:

```json
{
    "dependencies": {
        "heapq": "npm:@nwthomas/heapq@<version_here>"
    }
}
```

## Usage

This library was specifically set up to mirror Python's excellent `heapq` standard library package.

As such, it uses functions to operate on a standard array instead of requiring instantiation of classes. This makes it extremely fast to get up and running with this package.

### heapify

The `heapify` function will take an existing array of values and turn it into a valid heap in-place and in `O(n)` time. This function defaults to min heap operations:

```typescript
import { heapify } from "@nwthomas/heapq/heapify";

let heap = [3, 1, 2, 4, 5, 6, 7, 8, 9, 10];
heap = heapify(heap);
console.log(heap); // [1, 3, 2, 4, 5, 6, 7, 8, 9, 10]
```

A custom `comparator` function can be provided in an `options` object to perform max heap comparisons or to operate on more complex data types:

```typescript
import { heapify } from "@nwthomas/heapq/heapify";

let heap = [3, 1, 2, 4, 5, 6, 7, 8, 9, 10];
heap = heapify(heap, { comparator: (a, b) => a > b });
console.log(heap); // [10, 9, 7, 8, 5, 6, 2, 3, 4, 1]
```

### heapPop

The `heapPop` function will top off a value from a given heap in `O(log n)` time. It sifts up the next value in-place to take the place of the root that has been popped off. This funciton defaults to min heap operations:

```typescript
import { heapPop } from "@nwthomas/heapq/heapPop";

const heap = [1, 3, 2];
const result = heapPop(heap);
console.log(result); // 1
console.log(heap); // [2, 3]
```

A custom `comparator` function can be provided in an `options` object to perform max heap comparisons or to operate on more complex data types:

```typescript
import { heapPop } from "@nwthomas/heapq/heapPop";

const heap = [3, 1, 2];
const result = heapPop(heap, { comparator: (a, b) => a > b });
console.log(result); // 3
console.log(heap); // [2, 1]
```

### heapPush

The `heapPush` function will push a value to the end of a given array and then sift up the value in-place and in `O(log n)` time. This function defaults to min heap operations:

```typescript
// Import all functions
import { heapPush } from "@nwthomas/heapq/heapPush";

let heap = [1, 3, 2];
heap = heapPush(heap, 4);
console.log(heap); // [1, 3, 2, 4]
```

A custom `comparator` function can be provided in an `options` object to perform max heap comparisons or to operate on more complex data types:

```typescript
import { heapPush } from "@nwthomas/heapq/heapPush";

let heap = [3, 1, 2];
heap = heapPush(heap, 4, { comparator: (a, b) => a > b });
console.log(heap); // [4, 3, 2, 1]
```

### heapPushPop

The `heapPushPop` function pushes a value and pops a value from the heap in a single atomic operation using in-place operations and a final runtime of `O(log n)`. This function defaults to min heap operations. If the pushed value is less than the existing root value, the pushed value is returned:

```typescript
import { heapPushPop } from "@nwthomas/heapq/heapPushPop";

// Pushed value is greater than root value
const heap = [1, 3, 2];
const result = heapPushPop(heap, 4);
console.log(result); // 1
console.log(heap); // [2, 3, 4]

// Pushed value is less than root value
const heap = [2, 3, 4];
const result = heapPushPop(heap, 1);
console.log(result); // 1
console.log(heap); // [2, 3, 4]
```

Unlike `heapReplace` (see further below), this will possibly return the new value as it's first pushed to the heap and then a value is popped off and returned.

A custom `comparator` function can be provided in an `options` object to perform max heap comparisons or to operate on more complex data types:

```typescript
import { heapPushPop } from "@nwthomas/heapq/heapPushPop";

const heap = [20, 5, 10];
const result = heapPushPop(heap, 4, { comparator: (a, b) => a > b });
console.log(result); // 20
console.log(heap); // [10, 5, 4]
```

### heapReplace

The `heapReplace` function replaces a the root value with a new value, sifts it down, and then returns the original root value. This operation happens in-place with a runtime of `O(log n)` and defaults to min heap operations:

```typescript
import { heapReplace } from "@nwthomas/heapq/heapReplace";

const heap = [1, 3, 2];
const result = heapReplace(heap, 4);
console.log(result); // 1
console.log(heap); // [2, 3, 4]
```

Unlike `heapPushPop` (see further above), this will always return the _previous_ root value and then push the new one to the heap.

A custom `comparator` function can be provided in an `options` object to perform max heap comparisons or to operate on more complex data types:

```typescript
import { heapReplace } from "@nwthomas/heapq/heapReplace";

const heap = [3, 2, 1];
const result = heapReplace(heap, 4, { comparator: (a, b) => a > b });
console.log(result); // 3
console.log(heap); // [4, 2, 1]
```

### merge

The `merge` function takes in an array of heaps and an optional `options` object which can have a comparator function provided in it. It returns an iterator that can be called to progressively return ordered values from all iterables.

```typescript
import { merge } from "@nwthomas/heapq/merge";

const result = Array.from(
    merge([
        [1, 3, 5, 7],
        [2, 4, 6, 8],
    ]),
);
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8]
```

The default logic is to return values sorted as a min heap. It's assumed that the heaps included to be merged are already sorted appropriately according to the heap logic you're using (e.g. min or max heap).

A custom comparator function can be included in the options object to perform max heap comparisons or to operate on more complex data types:

```typescript
import { merge } from "@nwthomas/heapq/merge";

const result = Array.from(
    merge(
        [
            [7, 5, 3, 1],
            [8, 6, 4, 2],
        ],
        { comparator: (a, b) => a > b },
    ),
);
console.log(result); // [8, 7, 6, 5, 4, 3, 2, 1]
```

### nLargest

The `nLargest` function will return the `n` amount of largest numbers in the heap. It's assumed the array being operated on is a valid heap.

```typescript
import { nLargest } from "@nwthomas/heapq/nLargest";

const heap = [1, 3, 2, 4, 5, 6, 7, 8, 9, 10];
const result = nLargest(heap, 3);
console.log(result); // [10, 9, 8]
```

### nSmallest

The `nSmallest` function will return the `n` amount of smallest numbers in the heap. It's assumed the array being operated on is a valid heap.

```typescript
import { nSmallest } from "@nwthomas/heapq/nSmallest";

const heap = [1, 3, 2, 4, 5, 6, 7, 8, 9, 10];
const result = nSmallest(heap, 3);
console.log(result); // [1, 2, 3]
```

## TypeScript Support

Full TypeScript types are included out of the box with no need for an extra `@types` package. Example:

```typescript
import { heapPush, type Comparator } from "@nwthomas/heapq";

// Custom comparator for changing the min heap implementation to a max heap
const maxHeapComparator: Comparator<number> = (a, b) => a > b;

const maxHeap: number[] = [];
heapPush(maxHeap, 1, maxHeapComparator);
heapPush(maxHeap, 5, maxHeapComparator);
heapPush(maxHeap, 3, maxHeapComparator);
console.log(heapPop(maxHeap, maxHeapComparator)); // 5
console.log(heap); // [3, 1]
```

## Development Setup

For development setup, install bun. Setup guides can be found here:

```bash
https://bun.com
```

Next, install all dependencies for this repository:

```bash
bun install # or bun i
```

This should install everything you need to start making changes to this repo.

## Acknowledgements

- Thank you to [Synk](https://snyk.io) for writing a great guide on getting up to speed with [npm publishing in 2025](https://snyk.io/blog/best-practices-create-modern-npm-package)
