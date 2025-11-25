import { describe, expect, it } from "bun:test";

import { heapPush } from "../src/heapPush";

describe(heapPush.name, () => {
    it("should push a value to a minheap and maintain the heap ordering", () => {
        let heap = [1, 3, 2];
        heap = heapPush(heap, 4);
        expect(heap).toEqual([1, 3, 2, 4]);
    });

    it("should push a value to a max heap using a custom comparator for heap ordering", () => {
        let heap = [3, 1, 2];
        heap = heapPush(heap, 4, { comparator: (a, b) => a > b });
        expect(heap).toEqual([4, 3, 2, 1]);
    });

    it("should return the heap with a single value when used on an empty array", () => {
        let heap: number[] = [];
        heap = heapPush(heap, 4);
        expect(heap).toEqual([4]);
    });
});
