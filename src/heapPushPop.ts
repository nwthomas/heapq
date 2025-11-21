import { defaultComparator, siftDown } from './utils';

import type { Comparator } from './types';

export function heapPushPop<T>(heap: T[], value: T, cmp: Comparator<T> = defaultComparator<T>): T | void {
  if (heap.length > 0 && heap[0]! < value) {
    const returnValue = heap[0];
    heap[0] = value;
    siftDown(heap, 0, cmp);
    
    return returnValue!;
  }
  
  return value;
}
