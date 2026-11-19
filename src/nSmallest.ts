import type { Comparator, Options } from "./types";
import { _defaultMinHeapComparator } from "./utils";
import { heapReplace } from "./heapReplace";
import { heapify } from "./heapify";

export function nSmallest<T>(
    iterable: T[],
    n: number,
    options?: Options<T>,
): T[] {
    const size = iterable.length;
    const lessThan = options?.comparator ?? _defaultMinHeapComparator<T>;
    const maxHeapComparator: Comparator<T> = (a, b) => lessThan(b, a);
    const ascending = (a: T, b: T): number => {
        if (lessThan(a, b)) return -1;
        if (lessThan(b, a)) return 1;
        return 0;
    };

    if (n <= 0) {
        return [];
    }

    if (n >= size) {
        return iterable.slice().sort(ascending);
    }

    const heap: T[] = iterable.slice(0, n);
    heapify(heap, { comparator: maxHeapComparator });

    for (let i = n; i < size; i++) {
        const item = iterable[i]!;

        if (lessThan(item, heap[0]!)) {
            heapReplace(heap, item, { comparator: maxHeapComparator });
        }
    }

    return heap.sort(ascending);
}
