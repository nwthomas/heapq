# heapq 🥞

A TypeScript implementation of the Python heapq module.

I got tired of not having a great heap module in the JavaScript standard library, and all of the ones on npm haven't been touched in the better part of a decade.

## Installation

You can install `@nwthomas/heapq` quickly.

With [Bun](https://bun.com):

```bash
bun install @nwthomas/heapq
```

With [npm](https://nodejs.org):

```bash
npm install @nwthomas/heapq
```

With [Yarn](https://yarnpkg.com):

```bash
yarn install @nwthomas/heapq
```

With [pnpm](https://pnpm.io):

```bash
pnpm install @nwthomas/heapq
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

After installation, you can import and use it like this:

```typescript
// Import all functions
import { heapPush, heapPop, heapify } from "@nwthomas/heapq";

const heap: number[] = [];
heapPush(heap, 10);
heapPush(heap, 1);
heapPush(heap, 5);
console.log(heapPop(heap)); // 1
console.log(heap); // [5, 10]

// Or use granular imports for better tree-shaking
import { heapPush, heapPop } from "@nwthomas/heapq/heap";

const minHeap: number[] = [];
heapPush(minHeap, 3);
heapPush(minHeap, 1);
heapPush(minHeap, 2);
console.log(heapPop(minHeap)); // 1
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

For development setup, make sure to first setup bun. Setups can be found here:

```bash
https://bun.com
```

Next, install all dependencies:

```bash
bun install # or bun i
```

This should install everything you need to start making changes to this repo.

## Acknowledgements

- Thank you to [synk](https://snyk.io) for writing a great guide on getting up to speed with [npm publishing in 2025](https://snyk.io/blog/best-practices-create-modern-npm-package)
