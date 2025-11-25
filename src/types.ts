export type Comparator<T> = (a: T, b: T) => boolean;

export type Options<T> = {
    comparator?: Comparator<T>;
};
