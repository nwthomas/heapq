import { describe, expect, it } from "bun:test";

import { merge } from "../src/merge";

describe(merge.name, () => {
    it("should merge multiple sorted arrays in ascending order", () => {
        const result = Array.from(
            merge([
                [1, 3, 5, 7],
                [2, 4, 6, 8],
            ]),
        );
        expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it("should merge three sorted arrays", () => {
        const result = Array.from(
            merge([
                [1, 4, 7],
                [2, 5, 8],
                [3, 6, 9],
            ]),
        );
        expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("should handle empty arrays", () => {
        const result = Array.from(merge([[], [1, 2, 3], []]));
        expect(result).toEqual([1, 2, 3]);
    });

    it("should handle all empty arrays", () => {
        const result = Array.from(merge([[], [], []]));
        expect(result).toEqual([]);
    });

    it("should handle single array", () => {
        const result = Array.from(merge([[1, 2, 3, 4, 5]]));
        expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it("should merge arrays with different lengths", () => {
        const result = Array.from(
            merge([
                [1, 5, 9, 10, 11],
                [2, 3, 4],
            ]),
        );
        expect(result).toEqual([1, 2, 3, 4, 5, 9, 10, 11]);
    });

    it("should merge arrays with duplicate values", () => {
        const result = Array.from(
            merge([
                [1, 3, 5],
                [1, 3, 5],
            ]),
        );
        expect(result).toEqual([1, 1, 3, 3, 5, 5]);
    });

    it("should merge with custom comparator for max-heap behavior", () => {
        const result = Array.from(
            merge(
                [
                    [7, 5, 3, 1],
                    [8, 6, 4, 2],
                ],
                {
                    comparator: (a, b) => a > b,
                },
            ),
        );
        expect(result).toEqual([8, 7, 6, 5, 4, 3, 2, 1]);
    });

    it("should merge strings alphabetically", () => {
        const result = Array.from(
            merge([
                ["apple", "banana", "cherry"],
                ["apricot", "blueberry"],
            ]),
        );
        expect(result).toEqual([
            "apple",
            "apricot",
            "banana",
            "blueberry",
            "cherry",
        ]);
    });

    it("should merge objects with custom comparator", () => {
        const arr1 = [
            { id: 1, value: "a" },
            { id: 3, value: "c" },
        ];
        const arr2 = [
            { id: 2, value: "b" },
            { id: 4, value: "d" },
        ];
        const result = Array.from(
            merge([arr1, arr2], { comparator: (a, b) => a.id < b.id }),
        );
        expect(result).toEqual([
            { id: 1, value: "a" },
            { id: 2, value: "b" },
            { id: 3, value: "c" },
            { id: 4, value: "d" },
        ]);
    });

    it("should work with iterables other than arrays", () => {
        const set1 = new Set([1, 3, 5]);
        const set2 = new Set([2, 4, 6]);
        const result = Array.from(merge([set1, set2]));
        expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should handle single element arrays", () => {
        const result = Array.from(merge([[1], [2], [3]]));
        expect(result).toEqual([1, 2, 3]);
    });

    it("should yield values lazily without consuming all input at once", () => {
        const generator = merge([
            [1, 3, 5],
            [2, 4, 6],
        ]);
        expect(generator.next().value).toBe(1);
        expect(generator.next().value).toBe(2);
        expect(generator.next().value).toBe(3);
        expect(generator.next().value).toBe(4);
        expect(generator.next().value).toBe(5);
        expect(generator.next().value).toBe(6);
        expect(generator.next().done).toBe(true);
    });

    it("should merge negative numbers correctly", () => {
        const result = Array.from(
            merge([
                [-5, -3, -1],
                [-4, -2, 0],
            ]),
        );
        expect(result).toEqual([-5, -4, -3, -2, -1, 0]);
    });

    it("should handle arrays where one completes before others", () => {
        const result = Array.from(
            merge([
                [1, 2],
                [3, 4, 5, 6, 7, 8],
            ]),
        );
        expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it("yields equal values in the order of their source iterables", () => {
        type Tagged = { key: number; source: string };
        const byKey = { comparator: (a: Tagged, b: Tagged) => a.key < b.key };
        const tag = (source: string, keys: number[]): Tagged[] =>
            keys.map((key) => ({ key, source }));

        const result = Array.from(
            merge(
                [
                    tag("A", [1, 2, 2]),
                    tag("B", [1, 2]),
                    tag("C", [1, 1, 2]),
                    tag("D", [0, 1]),
                ],
                byKey,
            ),
        );

        expect(result.map(({ key, source }) => `${key}${source}`)).toEqual([
            "0D",
            "1A",
            "1B",
            "1C",
            "1C",
            "1D",
            "2A",
            "2A",
            "2B",
            "2C",
        ]);
    });

    it("keeps ties in source order with a max-heap comparator", () => {
        type Tagged = { key: number; source: string };
        const result = Array.from(
            merge<Tagged>(
                [
                    [
                        { key: 2, source: "A" },
                        { key: 1, source: "A" },
                    ],
                    [
                        { key: 2, source: "B" },
                        { key: 1, source: "B" },
                    ],
                ],
                { comparator: (a, b) => a.key > b.key },
            ),
        );
        expect(result.map(({ key, source }) => `${key}${source}`)).toEqual([
            "2A",
            "2B",
            "1A",
            "1B",
        ]);
    });

    it("merges many inputs correctly", () => {
        const inputs = Array.from({ length: 50 }, (_, i) =>
            Array.from({ length: 20 }, (_, j) => (j * 37 + i * 11) % 500).sort(
                (a, b) => a - b,
            ),
        );
        const expected = inputs.flat().sort((a, b) => a - b);
        expect(Array.from(merge(inputs))).toEqual(expected);
    });

    it("uses O(N log k) comparisons rather than rebuilding the heap per value", () => {
        const k = 64;
        const perInput = 16;
        const inputs = Array.from({ length: k }, (_, i) =>
            Array.from({ length: perInput }, (_, j) => j * k + i),
        );
        let comparisons = 0;
        const result = Array.from(
            merge(inputs, {
                comparator: (a, b) => {
                    comparisons++;
                    return a < b;
                },
            }),
        );

        const total = k * perInput;
        expect(result).toHaveLength(total);

        // Each value costs at most ~2 comparisons per heap level (2 * log2 k = 12),
        // and every comparison of two entries calls the comparator up to twice.
        expect(comparisons).toBeLessThan(total * 2 * 2 * Math.log2(k));
    });
});
