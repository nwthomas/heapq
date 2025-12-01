import { describe, expect, it } from "bun:test";

import { nSmallest } from "../src/nSmallest";

describe(nSmallest.name, () => {
    it("should return the n smallest elements from an array", () => {
        const result = nSmallest([1, 3, 2, 4, 5, 6, 7, 8, 9, 10], 3);
        expect(result).toEqual([1, 2, 3]);
    });

    it("returns an empty array when n is 0", () => {
        const result = nSmallest([1, 3, 2, 4, 5, 6, 7, 8, 9, 10], 0);
        expect(result).toEqual([]);
    });

    it("returns an empty array when n is negative", () => {
        const result = nSmallest([1, 3, 2, 4, 5, 6, 7, 8, 9, 10], -1);
        expect(result).toEqual([]);
    });

    it("returns the smallest single element in an array when n is 1", () => {
        const result = nSmallest([1, 3, 2, 4, 5, 6, 7, 8, 9, 10], 1);
        expect(result).toEqual([1]);
    });

    it("returns a sorted array when n is greater than the length of the array", () => {
        const result = nSmallest([1, 3, 2, 4, 5, 6, 7, 8, 9, 10], 11);
        expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
});
