import { _defaultMinHeapComparator, _siftDown } from "./utils";

import type { Options } from "./types";

export function heapify<T>(heap: T[], options?: Options<T>): T[] {
    const cmp = options?.comparator ?? _defaultMinHeapComparator<T>;

    for (let i = (heap.length >> 1) - 1; i >= 0; i--) {
        _siftDown(heap, i, cmp);
    }

    return heap;
}
