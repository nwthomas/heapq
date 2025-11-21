import { defaultComparator, siftDown } from './utils';

import type { Comparator } from './types';

export function heapify<T>(heap: T[], cmp: Comparator<T> = defaultComparator<T>): T[] {
  for (let i = (heap.length >> 1) - 1; i >= 0; i--) {
    siftDown(heap, i, cmp);
  }

  return heap;
}