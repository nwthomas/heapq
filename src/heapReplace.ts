import { _defaultComparator, _siftDown } from "./utils";
import { heapPush } from "./heapPush";

import type { Comparator } from "./types";

export function heapReplace<T>(
    heap: T[],
    value: T,
    cmp: Comparator<T> = _defaultComparator<T>,
): T | void {
    if (heap.length === 0) {
        heapPush(heap, value);
        return;
    }

    const returnValue = heap[0];
    heap[0] = value;
    _siftDown(heap, 0, cmp);

    return returnValue;
}
