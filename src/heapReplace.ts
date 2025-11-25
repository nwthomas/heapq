import { _defaultComparator, _siftDown } from "./utils";
import { heapPush } from "./heapPush";

import type { Options } from "./types";

export function heapReplace<T>(
    heap: T[],
    value: T,
    options?: Options<T>,
): T | void {
    const cmp = options?.comparator ?? _defaultComparator<T>;

    if (heap.length === 0) {
        heapPush(heap, value, options);
        return;
    }

    const returnValue = heap[0];
    heap[0] = value;
    _siftDown(heap, 0, cmp);

    return returnValue;
}
