import { _defaultMinHeapComparator, _siftDown } from "./utils";

import type { Options } from "./types";

export function heapPop<T>(heap: T[], options?: Options<T>): T | void {
    if (heap.length === 0) {
        return;
    }
    if (heap.length === 1) {
        return heap.pop();
    }

    const cmp = options?.comparator ?? _defaultMinHeapComparator<T>;

    const value = heap[0]!;
    heap[0]! = heap[heap.length - 1]!;
    heap.pop();
    _siftDown(heap, 0, cmp);

    return value;
}
