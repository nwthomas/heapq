import { _defaultComparator, _siftUp } from "./utils";

import type { Comparator } from "./types";

export function heapPush<T>(
    heap: T[],
    value: T,
    cmp: Comparator<T> = _defaultComparator<T>,
): T[] {
    heap.push(value);
    _siftUp(heap, heap.length - 1, cmp);

    return heap;
}
