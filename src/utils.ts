import type { Comparator } from './types';

export function defaultComparator<T>(a: T, b: T): boolean {
    return a < b;
}

function getLeftChildIndex(index: number): number {
    return (index << 1) + 1;
}

function getRightChildIndex(index: number): number {
    return (index << 1) + 2;
}

function getParentIndex(index: number): number {
    return (index - 1) >> 1;
}

export function siftDown<T>(heap: T[], index: number, cmp: Comparator<T>): void {
    const n = heap.length;
    const item = heap[index];

    while (true) {
        const left = getLeftChildIndex(index);
        if (left >= n) break;

        let smallest = left;
        const right = getRightChildIndex(index);

        if (right < n && cmp(heap[right]!, heap[left]!)) {
            smallest = right;
        }

        if (cmp(heap[smallest]!, item!)) break;

        heap[index]! = heap[smallest]!;
        index = smallest;
    }

    heap[index]! = item!;
}

export function siftUp<T>(heap: T[], index: number, cmp: Comparator<T>): void {
    while (index > 0) {
        const parentIndex = getParentIndex(index);

        if (cmp(heap[parentIndex]!, heap[index]!)) {
            break;
        }

        swap(heap, index, parentIndex);
        index = parentIndex;
    }
}

export function swap<T>(array: T[], indexOne: number, indexTwo: number): void {
    [array[indexOne]!, array[indexTwo]!] = [array[indexTwo]!, array[indexOne]!];
}
