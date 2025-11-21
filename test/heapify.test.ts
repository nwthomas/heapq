import { describe, expect, it } from 'bun:test';

import { heapify } from '../src/heapify';

describe(heapify.name, () => {
  it("should heapify an existing array", () => {
    const heap = [3, 1, 2, 4, 5, 6, 7, 8, 9, 10];
    heapify(heap);
    expect(heap).toEqual([1, 3, 2, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("should not error when used on an empty array", () => {
    const heap: number[] = [];
    heapify(heap);
    expect(heap).toEqual([]);
  });

  it("should heapify an array with a custom comparator for max heap", () => {
    const heap = [3, 1, 2, 4, 5, 6, 7, 8, 9, 10];
    heapify(heap, (a, b) => a > b);
    expect(heap).toEqual([10, 9, 7, 8, 5, 6, 2, 3, 4, 1]);
  });
});