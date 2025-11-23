import { describe, expect, it } from "bun:test";

import { heapPop } from "../src/heapPop";

describe(heapPop.name, () => {
    it("should pop the root element of the hea and return it and sift up values for min heap", () => {
        const heap = [1, 3, 2];
        const result = heapPop(heap);
        expect(result).toBe(1);
        expect(heap).toEqual([2, 3]);
    });

    it("should return undefined when used on an empty array", () => {
        const heap: number[] = [];
        const result = heapPop(heap);
        expect(result).toBeUndefined();
    });

    it("should pop the root element of the heap with a custom comparator for max heap", () => {
        const heap = [3, 1, 2];
        const result = heapPop(heap, (a, b) => a > b);
        expect(result).toBe(3);
        expect(heap).toEqual([2, 1]);
    });
});
