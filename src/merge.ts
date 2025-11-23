import { heapPop } from "./heapPop";
import { heapify } from "./heapify";
import { _defaultComparator } from "./utils";

import type { Comparator } from "./types";

type HeapEntry<T> = {
    value: T;
    sourceIndex: number;
    iterator: Iterator<T>;
};

export function* merge<T>(
    ...args: Array<Iterable<T> | Comparator<T>>
): Generator<T, void, undefined> {
    let cmp: Comparator<T> = _defaultComparator<T>;
    let iterables: Iterable<T>[] = args as Iterable<T>[];

    for (let i = 0; i < args.length - 1; i++) {
        const arg = args[i];
        if (
            typeof arg === "function" &&
            !arg[Symbol.iterator as keyof typeof arg]
        ) {
            throw new Error("Comparator function must be the last argument");
        }
    }

    if (args.length > 0 && typeof args[args.length - 1] === "function") {
        const lastArg = args[args.length - 1];
        if (
            typeof lastArg === "function" &&
            !lastArg[Symbol.iterator as keyof typeof lastArg]
        ) {
            cmp = lastArg as Comparator<T>;
            iterables = args.slice(0, -1) as Iterable<T>[];
        }
    }

    const heap: HeapEntry<T>[] = [];

    for (let sourceIndex = 0; sourceIndex < iterables.length; sourceIndex++) {
        const iterator = iterables[sourceIndex]![Symbol.iterator]();
        const result = iterator.next();

        if (!result.done) {
            heap.push({
                value: result.value,
                sourceIndex,
                iterator,
            });
        }
    }

    heapify(heap, (a, b) => cmp(a.value, b.value));

    while (heap.length > 0) {
        if (heap.length === 1) {
            const entry = heap[0]!;
            yield entry.value;

            let result = entry.iterator.next();
            while (!result.done) {
                yield result.value;
                result = entry.iterator.next();
            }
            break;
        }

        const smallest = heapPop(heap, (a, b) => cmp(a.value, b.value));

        if (smallest === undefined) {
            break;
        }

        yield smallest.value;

        const nextResult = smallest.iterator.next();

        if (!nextResult.done) {
            heap.push({
                value: nextResult.value,
                sourceIndex: smallest.sourceIndex,
                iterator: smallest.iterator,
            });
            heapify(heap, (a, b) => cmp(a.value, b.value));
        }
    }
}
