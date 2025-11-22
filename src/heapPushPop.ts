import { _defaultComparator, _siftDown } from "./utils";

import type { Comparator } from "./types";

export function heapPushPop<T>(
    heap: T[],
    value: T,
    cmp: Comparator<T> = _defaultComparator<T>,
): T | void {
    if (heap.length > 0 && cmp(heap[0]!, value)) {
        const returnValue = heap[0];
        heap[0] = value;
        _siftDown(heap, 0, cmp);

        return returnValue!;
    }

    return value;
}
