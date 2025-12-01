import type { Options } from "./types";
import { heapReplace } from "./heapReplace";
import { heapify } from "./heapify";
import { _defaultMinHeapComparator } from "./utils";

export function nLargest<T>(iterable: T[], n: number): T[] {
    const size = iterable.length;
    const cmp = _defaultMinHeapComparator<T>;

    if (n <= 0) {
        return [];
    }

    if (n >= size) {
        const result = iterable.slice();
        result.sort((a, b) => {
            if (cmp(a, b)) return 1;
            if (cmp(b, a)) return -1;
            return 0;
        });
        return result;
    }

    const heap: T[] = iterable.slice(0, n);
    heapify(heap, { comparator: cmp });

    for (let i = n; i < size; i++) {
        const item = iterable[i]!;
        const heapTop = heap[0]!;

        if (!cmp(item, heapTop)) {
            heapReplace(heap, item, { comparator: cmp });
        }
    }

    heap.sort((a, b) => {
        if (cmp(a, b)) return 1;
        if (cmp(b, a)) return -1;
        return 0;
    });

    return heap;
}
