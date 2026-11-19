---
"@nwthomas/heapq": major
---

**Breaking:** `nSmallest` now reads a custom comparator the same way as `nLargest` and the heap functions: `comparator(a, b)` returns `true` when `a` ranks before `b`. Previously it expected the reversed comparator. To get the smallest items by a field, pass `(a, b) => a.field < b.field`; if you passed `>` before, change it to `<`.

`merge` now yields equal values in the order of their source iterables (stable, like Python's `heapq.merge`) and runs in O(N log k) instead of rebuilding the heap after every value.
