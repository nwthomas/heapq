import { defaultComparator, siftDown, siftUp } from './utils';

import type { Comparator } from './types';

export function heappush<T>(heap: T[], value: T, cmp: Comparator<T> = defaultComparator<T>): void {
  heap.push(value);
  siftUp(heap, heap.length - 1, cmp);
}

export function heappop<T>(heap: T[], cmp: Comparator<T> = defaultComparator<T>): T | void {
  if (heap.length === 0) {
    return;
  }

  const value = heap[0]!;
  heap[0]! = heap[heap.length - 1]!;
  heap.pop();
  siftDown(heap, 0, cmp);
  
  return value;
}

export function heappushpop<T>(heap: T[], value: T, cmp: Comparator<T> = defaultComparator<T>): T | void {
  if (heap.length !== 0 && heap[0]! < value) {
    const returnValue = heap[0];
    heap[0] = value;
    siftDown(heap, 0, cmp);
    
    return returnValue!;
  }
  
  return value;
}

export function heapreplace<T>(heap: T[], value: T, cmp: Comparator<T> = defaultComparator<T>): T | void {
  const returnValue = heap[0];
  heap[0] = value;
  siftDown(heap, 0, cmp);

  return returnValue;
}

export function heapify<T>(heap: T[], cmp: Comparator<T> = defaultComparator<T>): void {
  for (let i = (heap.length >> 1) - 1; i >= 0; i--) {
    siftDown(heap, i, cmp);
  }
}