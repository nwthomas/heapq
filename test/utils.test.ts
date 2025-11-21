import { defaultComparator, getLeftChildIndex, getParentIndex, getRightChildIndex } from '../src/utils';
import { describe, expect, it } from 'bun:test';

describe('utils', () => {
  describe('defaultComparator', () => {
    it('should return true if a < b', () => {
      expect(defaultComparator(1, 2)).toBe(true);
    });

    it('should return false if a >= b', () => {
      expect(defaultComparator(2, 1)).toBe(false);
    });
  });

  describe('getLeftChildIndex', () => {
    it("should return the left child index for the root of the heap", () => {
      expect(getLeftChildIndex(0)).toBe(1);
    });

    it("should return the left child index for a child of the root", () => {
      expect(getLeftChildIndex(1)).toBe(3);
    });

    it("should return the left child index for a child of a child of the root", () => {
      expect(getLeftChildIndex(2)).toBe(5);
    });
  });

  describe('getRightChildIndex', () => {
    it("should return the right child index for the root of the heap", () => {
      expect(getRightChildIndex(0)).toBe(2);
    });

    it("should return the right child index for a child of the root", () => {
      expect(getRightChildIndex(1)).toBe(4);
    });
  });

  describe('getParentIndex', () => {
    it("should return the parent index for a left child of the root", () => {
      expect(getParentIndex(1)).toBe(0);
    });

    it("should return the parent index for a right child of the root", () => {
      expect(getParentIndex(2)).toBe(0);
    });

    it("should return the parent index for a deeply-nested left child", () => {
      expect(getParentIndex(9)).toBe(4);
    });
    
    it("should return the parent index for a deeply-nested right child", () => {
      expect(getParentIndex(10)).toBe(4);
    });
  });
});