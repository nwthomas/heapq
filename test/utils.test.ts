import {
  defaultComparator,
  getLeftChildIndex,
  getParentIndex,
  getRightChildIndex,
  siftDown,
  siftUp,
  swapIndicesInPlace,
} from '../src/utils';
import { describe, expect, it } from 'bun:test';

describe("utils", () => {
  describe('defaultComparator', () => {
    it('should return true if a < b', () => {
      const result = defaultComparator(1, 2);
      expect(result).toBe(true);
    });

    it('should return false if a >= b', () => {
      const result = defaultComparator(2, 1);
      expect(result).toBe(false);
    });
  });

  describe(getLeftChildIndex.name, () => {
    it("should return the left child index for the root of the heap", () => {
      const result = getLeftChildIndex(0);
      expect(result).toBe(1);
    });

    it("should return the left child index for a child of the root", () => {
      const result = getLeftChildIndex(1);
      expect(result).toBe(3);
    });

    it("should return the left child index for a child of a child of the root", () => {
      const result = getLeftChildIndex(2);
      expect(result).toBe(5);
    });
  });

  describe(getRightChildIndex.name, () => {
    it("should return the right child index for the root of the heap", () => {
      const result = getRightChildIndex(0);
      expect(result).toBe(2);
    });

    it("should return the right child index for a child of the root", () => {
      const result = getRightChildIndex(1);
      expect(result).toBe(4);
    });
  });

  describe(getParentIndex.name, () => {
    it("should return the parent index for a left child of the root", () => {
      const result = getParentIndex(1);
      expect(result).toBe(0);
    });

    it("should return the parent index for a right child of the root", () => {
      const result = getParentIndex(2);
      expect(result).toBe(0);
    });

    it("should return the parent index for a deeply-nested left child", () => {
      const result = getParentIndex(9);
      expect(result).toBe(4);
    });
    
    it("should return the parent index for a deeply-nested right child", () => {
      const result = getParentIndex(10);
      expect(result).toBe(4);
    });
  });

  describe(siftDown.name, () => {
    it("should sift down the root element of the heap", () => {
      const heap = [3, 1, 2];
      siftDown(heap, 0, defaultComparator);
      expect(heap).toEqual([1, 3, 2]);
    });

    it("should sift down the root element of the heap with a custom comparator for max heap", () => {
      const heap = [1, 3, 2];
      siftDown(heap, 0, (a, b) => a > b);
      expect(heap).toEqual([3, 1, 2]);
    });
  });

  describe(siftUp.name, () => {
    it("should sift up the last element of the heap", () => {
      const heap = [3, 2, 1];
      siftUp(heap, 2, defaultComparator);
      expect(heap).toEqual([1, 2, 3]);
    });

    it("should sift up the last element of the heap with a custom comparator for max heap", () => {
      const heap = [1, 2, 3];
      siftUp(heap, 2, (a, b) => a > b);
      expect(heap).toEqual([3, 2, 1]);
    });
  });

  describe(swapIndicesInPlace.name, () => {
    it("should mutate in place and swap two elements in an array", () => {
      const array = [1, 2, 3];
      swapIndicesInPlace(array, 0, 2);
      expect(array).toEqual([3, 2, 1]);
    });

    it("does not error if given same array index to swap with itself", () => {
      const array = [1, 2, 3];
      swapIndicesInPlace(array, 0, 0);
      expect(array).toEqual([1, 2, 3]);
    });
  });
});