export interface Trailers extends Iterable<[string, string]> {
  get(key: string): string;
  has(key: string): boolean;
}

export interface MutableTrailers extends Trailers {
  set(key: string, value: string): void;
}
