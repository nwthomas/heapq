import type { Comparator } from './types';

export function _defaultComparator<T>(a: T, b: T): boolean {
    return a < b;
}

export function _getLeftChildIndex(index: number): number {
    return (index << 1) + 1;
}

export function _getRightChildIndex(index: number): number {
    return (index << 1) + 2;
}

export function _getParentIndex(index: number): number {
    return (index - 1) >> 1;
}

export function _siftDown<T>(heap: T[], index: number, cmp: Comparator<T>): void {
    const length = heap.length;
    const value = heap[index];

    while (true) {
        const left = _getLeftChildIndex(index);
        if (left >= length) {
            break;
        }
        
        let smallest = left;
        const right = _getRightChildIndex(index);

        if (right < length && cmp(heap[right]!, heap[left]!)) {
            smallest = right;
        }

        if (!cmp(heap[smallest]!, value!)) {
            break;
        }

        heap[index]! = heap[smallest]!;
        index = smallest;
    }

    heap[index]! = value!;
}

export function _siftUp<T>(heap: T[], index: number, cmp: Comparator<T>): void {
    while (index > 0) {
        const parentIndex = _getParentIndex(index);

        if (cmp(heap[parentIndex]!, heap[index]!)) {
            break;
        }

        _swapIndicesInPlace(heap, index, parentIndex);
        index = parentIndex;
    }
}

export function _swapIndicesInPlace<T>(heap: T[], indexOne: number, indexTwo: number): void {
    [heap[indexOne]!, heap[indexTwo]!] = [heap[indexTwo]!, heap[indexOne]!];
}
