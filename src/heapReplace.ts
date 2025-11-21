import { defaultComparator, siftDown, siftUp } from './utils';

import type { Comparator } from './types';

export function heapReplace<T>(heap: T[], value: T, cmp: Comparator<T> = defaultComparator<T>): T | void {
  const returnValue = heap[0];
  heap[0] = value;
  siftDown(heap, 0, cmp);

  return returnValue;
}