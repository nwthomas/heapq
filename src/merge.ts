import { heapPop } from "./heapPop";
import { heapify } from "./heapify";
import { _defaultComparator } from "./utils";

import type { Comparator } from "./types";

type HeapEntry<T> = {
    value: T;
    sourceIndex: number;
    iterator: Iterator<T>;
};

type MergeOptions<T> = {
    comparator?: Comparator<T>;
};

export function* merge<T>(
    iterables: Iterable<T>[],
    options?: MergeOptions<T>,
): Generator<T, void, undefined> {
    const cmp: Comparator<T> = options?.comparator ?? _defaultComparator<T>;
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
