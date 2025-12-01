import { describe, expect, it } from "bun:test";

import { nLargest } from "../src/nLargest";

describe(nLargest.name, () => {
    it("should return the n largest elements from an array", () => {
        const result = nLargest([1, 3, 2, 4, 5, 6, 7, 8, 9, 10], 3);
        expect(result).toEqual([10, 9, 8]);
    });

    it("returns an empty array when n is 0", () => {
        const result = nLargest([1, 3, 2, 4, 5, 6, 7, 8, 9, 10], 0);
        expect(result).toEqual([]);
    });

    it("returns an empty array when n is negative", () => {
        const result = nLargest([1, 3, 2, 4, 5, 6, 7, 8, 9, 10], -1);
        expect(result).toEqual([]);
    });

    it("returns the largest single element in an array when n is 1", () => {
        const result = nLargest([1, 3, 2, 4, 5, 6, 7, 8, 9, 10], 1);
        expect(result).toEqual([10]);
    });

    it("returns a sorted array when n is greater than the length of the array", () => {
        const result = nLargest([1, 3, 2, 4, 5, 6, 7, 8, 9, 10], 11);
        expect(result).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
    });
});
