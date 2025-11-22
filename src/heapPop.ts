import { _defaultComparator, _siftDown } from "./utils";

import type { Comparator } from "./types";

export function heapPop<T>(
    heap: T[],
    cmp: Comparator<T> = _defaultComparator<T>,
): T | void {
    if (heap.length === 0) {
        return;
    }

    const value = heap[0]!;
    heap[0]! = heap[heap.length - 1]!;
    heap.pop();
    _siftDown(heap, 0, cmp);

    return value;
}
