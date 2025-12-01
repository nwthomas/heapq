import { _defaultMinHeapComparator, _siftUp } from "./utils";

import type { Options } from "./types";

export function heapPush<T>(heap: T[], value: T, options?: Options<T>): T[] {
    const cmp = options?.comparator ?? _defaultMinHeapComparator<T>;

    heap.push(value);
    _siftUp(heap, heap.length - 1, cmp);

    return heap;
}
