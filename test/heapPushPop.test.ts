import { describe, expect, it } from "bun:test";

import { heapPushPop } from "../src/heapPushPop";

describe(heapPushPop.name, () => {
    it("should push and pop the root element of a min heap", () => {
        const heap = [3, 1, 2];
        const result = heapPushPop(heap, 4);
        expect(result).toBe(3);
    });

    it("should return pushed value when root element is less than pushed value for min heap", () => {
        const heap = [5, 10, 20];
        const result = heapPushPop(heap, 1);
        expect(result).toBe(1);
        expect(heap).toEqual([5, 10, 20]);
    });

    it("should return root value when root element is less than pushed value for min heap", () => {
        const heap = [5, 10, 20];
        const result = heapPushPop(heap, 12);
        expect(result).toBe(5);
        expect(heap).toEqual([10, 12, 20]);
    });

    it("should return root value when root element is greater than pushed value for max heap", () => {
        const heap = [20, 5, 10];
        const result = heapPushPop(heap, 12, (a, b) => a > b);
        expect(result).toBe(20);
        expect(heap).toEqual([12, 5, 10]);
    });

    it("should return pushed value when root element is greater than pushed value for max heap", () => {
        const heap = [20, 5, 10];
        const result = heapPushPop(heap, 21, (a, b) => a > b);
        expect(result).toBe(21);
        expect(heap).toEqual([20, 5, 10]);
    });

    it("should return undefined when used on an empty array", () => {
        const heap: number[] = [];
        const result = heapPushPop(heap, 4);
        expect(result).toBe(4);
    });
});
