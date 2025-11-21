import type { Comparator } from './types';

export function defaultComparator<T>(a: T, b: T): boolean {
    return a < b;
}

export function getLeftChildIndex(index: number): number {
    return (index << 1) + 1;
}

export function getRightChildIndex(index: number): number {
    return (index << 1) + 2;
}

export function getParentIndex(index: number): number {
    return (index - 1) >> 1;
}

export function siftDown<T>(heap: T[], index: number, cmp: Comparator<T>): void {
    const length = heap.length;
    const item = heap[index];

    while (true) {
        const left = getLeftChildIndex(index);
        if (left >= length) break;

        let smallest = left;
        const right = getRightChildIndex(index);

        if (right < length && cmp(heap[right]!, heap[left]!)) {
            smallest = right;
        }

        if (!cmp(heap[smallest]!, item!)) break;

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

        swapIndicesInPlace(heap, index, parentIndex);
        index = parentIndex;
    }
}

export function swapIndicesInPlace<T>(array: T[], indexOne: number, indexTwo: number): void {
    [array[indexOne]!, array[indexTwo]!] = [array[indexTwo]!, array[indexOne]!];
}
