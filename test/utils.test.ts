import { defaultComparator, getLeftChildIndex, getParentIndex, getRightChildIndex } from '../src/utils';
import { describe, expect, it } from 'bun:test';

describe('utils', () => {
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

  describe('getLeftChildIndex', () => {
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

  describe('getRightChildIndex', () => {
    it("should return the right child index for the root of the heap", () => {
      const result = getRightChildIndex(0);
      expect(result).toBe(2);
    });

    it("should return the right child index for a child of the root", () => {
      const result = getRightChildIndex(1);
      expect(result).toBe(4);
    });
  });

  describe('getParentIndex', () => {
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
});