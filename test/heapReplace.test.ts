import { describe, expect, it } from "bun:test";

import { heapReplace } from "../src/heapReplace";

describe(heapReplace.name, () => {
    it("should replace the root element of the heap and return the old root element", () => {
        const heap = [1, 3, 2];
        const result = heapReplace(heap, 4);
        expect(result).toBe(1);
        expect(heap).toEqual([2, 3, 4]);
    });

    it("should return undefined when the heap is empty", () => {
        const heap: number[] = [];
        const result = heapReplace(heap, 4);
        expect(result).toBeUndefined();
        expect(heap).toEqual([4]);
    });

    it("should replace the root element of the heap with a custom comparator for max heap", () => {
        const heap = [3, 2, 1];
        const result = heapReplace(heap, 4, (a, b) => a > b);
        expect(result).toBe(3);
        expect(heap).toEqual([4, 2, 1]);
    });
});
