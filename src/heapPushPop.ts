import { _defaultMinHeapComparator, _siftDown } from "./utils";

import type { Options } from "./types";

export function heapPushPop<T>(
    heap: T[],
    value: T,
    options?: Options<T>,
): T | void {
    const cmp = options?.comparator ?? _defaultMinHeapComparator<T>;

    if (heap.length > 0 && cmp(heap[0]!, value)) {
        const returnValue = heap[0];
        heap[0] = value;
        _siftDown(heap, 0, cmp);

        return returnValue!;
    }

    return value;
}
