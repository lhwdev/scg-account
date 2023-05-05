export type Nested<T> = T | T[] | Record<string, T>;

export type Json = Nested<string | number | boolean>;
