import { describe, expect, test } from 'bun:test';
import { defaultComparator, siftDown, siftUp, swap } from '../src/utils';

describe('utils', () => {
  describe('defaultComparator', () => {
    test('should return true if a < b', () => {
      expect(defaultComparator(1, 2)).toBe(true);
    });

    test('should return false if a >= b', () => {
      expect(defaultComparator(2, 1)).toBe(false);
    });
  });

  describe('siftDown', () => {
    // test("should sift down the heap", () => {
    //   const heap = [2, 1, 3];
    //   siftDown(heap, 0, defaultComparator);
    //   expect(heap).toEqual([2, 1, 3]);
    // });
  });
});