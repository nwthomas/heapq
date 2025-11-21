import { defaultComparator, siftUp } from './utils';

import type { Comparator } from './types';

export function heapPush<T>(heap: T[], value: T, cmp: Comparator<T> = defaultComparator<T>): T[] {
  heap.push(value);
  siftUp(heap, heap.length - 1, cmp);

  return heap;
}