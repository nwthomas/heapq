import {
    _defaultMaxHeapComparator,
    _defaultMinHeapComparator,
    _getLeftChildIndex,
    _getParentIndex,
    _getRightChildIndex,
    _siftDown,
    _siftUp,
    _swapIndicesInPlace,
} from "../src/utils";
import { describe, expect, it } from "bun:test";

describe("utils", () => {
    describe(_defaultMinHeapComparator.name, () => {
        it("should return true if a < b", () => {
            const result = _defaultMinHeapComparator(1, 2);
            expect(result).toBe(true);
        });

        it("should return false if a >= b", () => {
            const result = _defaultMinHeapComparator(2, 1);
            expect(result).toBe(false);
        });
    });

    describe(_defaultMaxHeapComparator.name, () => {
        it("should return true if a > b", () => {
            const result = _defaultMaxHeapComparator(2, 1);
            expect(result).toBe(true);
        });

        it("should return false if a <= b", () => {
            const result = _defaultMaxHeapComparator(2, 2);
            expect(result).toBe(false);
        });
    });

    describe(_getLeftChildIndex.name, () => {
        it("should return the left child index for the root of the heap", () => {
            const result = _getLeftChildIndex(0);
            expect(result).toBe(1);
        });

        it("should return the left child index for a child of the root", () => {
            const result = _getLeftChildIndex(1);
            expect(result).toBe(3);
        });

        it("should return the left child index for a child of a child of the root", () => {
            const result = _getLeftChildIndex(2);
            expect(result).toBe(5);
        });
    });

    describe(_getRightChildIndex.name, () => {
        it("should return the right child index for the root of the heap", () => {
            const result = _getRightChildIndex(0);
            expect(result).toBe(2);
        });

        it("should return the right child index for a child of the root", () => {
            const result = _getRightChildIndex(1);
            expect(result).toBe(4);
        });
    });

    describe(_getParentIndex.name, () => {
        it("should return the parent index for a left child of the root", () => {
            const result = _getParentIndex(1);
            expect(result).toBe(0);
        });

        it("should return the parent index for a right child of the root", () => {
            const result = _getParentIndex(2);
            expect(result).toBe(0);
        });

        it("should return the parent index for a deeply-nested left child", () => {
            const result = _getParentIndex(9);
            expect(result).toBe(4);
        });

        it("should return the parent index for a deeply-nested right child", () => {
            const result = _getParentIndex(10);
            expect(result).toBe(4);
        });
    });

    describe(_siftDown.name, () => {
        it("should sift down the root element of the heap", () => {
            const heap = [3, 1, 2];
            _siftDown(heap, 0, _defaultMinHeapComparator);
            expect(heap).toEqual([1, 3, 2]);
        });

        it("should sift down the root element of the heap with a custom comparator for max heap", () => {
            const heap = [1, 3, 2];
            _siftDown(heap, 0, (a, b) => a > b);
            expect(heap).toEqual([3, 1, 2]);
        });
    });

    describe(_siftUp.name, () => {
        it("should sift up the last element of the heap", () => {
            const heap = [3, 2, 1];
            _siftUp(heap, 2, _defaultMinHeapComparator);
            expect(heap).toEqual([1, 2, 3]);
        });

        it("should sift up the last element of the heap with a custom comparator for max heap", () => {
            const heap = [1, 2, 3];
            _siftUp(heap, 2, (a, b) => a > b);
            expect(heap).toEqual([3, 2, 1]);
        });
    });

    describe(_swapIndicesInPlace.name, () => {
        it("should mutate in place and swap two elements in an array", () => {
            const array = [1, 2, 3];
            _swapIndicesInPlace(array, 0, 2);
            expect(array).toEqual([3, 2, 1]);
        });

        it("does not error if given same array index to swap with itself", () => {
            const array = [1, 2, 3];
            _swapIndicesInPlace(array, 0, 0);
            expect(array).toEqual([1, 2, 3]);
        });
    });
});
