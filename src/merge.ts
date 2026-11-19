import { heapPop } from "./heapPop";
import { heapReplace } from "./heapReplace";
import { heapify } from "./heapify";
import { _defaultMinHeapComparator } from "./utils";

import type { Comparator, Options } from "./types";

type HeapEntry<T> = {
    value: T;
    sourceIndex: number;
    iterator: Iterator<T>;
};

export function* merge<T>(
    iterables: Iterable<T>[],
    options?: Options<T>,
): Generator<T, void, undefined> {
    const cmp = options?.comparator ?? _defaultMinHeapComparator<T>;

    const entryComparator: Comparator<HeapEntry<T>> = (a, b) => {
        if (cmp(a.value, b.value)) return true;
        if (cmp(b.value, a.value)) return false;
        return a.sourceIndex < b.sourceIndex;
    };

    const heapOptions = { comparator: entryComparator };
    const heap: HeapEntry<T>[] = [];

    for (let sourceIndex = 0; sourceIndex < iterables.length; sourceIndex++) {
        const iterator = iterables[sourceIndex]![Symbol.iterator]();
        const result = iterator.next();

        if (!result.done) {
            heap.push({ value: result.value, sourceIndex, iterator });
        }
    }

    heapify(heap, heapOptions);

    while (heap.length > 1) {
        const top = heap[0]!;
        yield top.value;

        const next = top.iterator.next();

        if (next.done) {
            heapPop(heap, heapOptions);
        } else {
            heapReplace(
                heap,
                {
                    value: next.value,
                    sourceIndex: top.sourceIndex,
                    iterator: top.iterator,
                },
                heapOptions,
            );
        }
    }

    if (heap.length === 1) {
        const { value, iterator } = heap[0]!;
        yield value;

        let result = iterator.next();
        while (!result.done) {
            yield result.value;
            result = iterator.next();
        }
    }
}
