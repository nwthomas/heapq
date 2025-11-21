import { defaultComparator, siftDown, siftUp, swap } from "../src/utils";

describe("utils", () => {
    describe("defaultComparator", () => {
        it("should return true if a < b", () => {
            expect(defaultComparator(1, 2)).toBe(true);
        });

        it("should return false if a >= b", () => {
            expect(defaultComparator(2, 1)).toBe(false);
        });
    });
    
    describe("siftDown", () => {
        // it("should sift down the heap", () => {
        //     const heap = [2, 1, 3];
        //     siftDown(heap, 0, defaultComparator);
        //     expect(heap).toEqual([2, 1, 3]);
        // });
    });
});