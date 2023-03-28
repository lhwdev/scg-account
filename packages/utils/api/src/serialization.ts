export const serializerSymbol = Symbol("serializerOf");

export type Serializable<T> =
  | {
      [serializerSymbol]: Serializer<T>;
    }
  | Serializer<T>;

export function serializerOf<T>(serializable: Serializable<T>) {
  if (serializerSymbol in serializable) {
    return serializable[serializerSymbol];
  } else {
    return serializable;
  }
}

export interface Serializer<T> {
  serialize(data: T): Json;
  deserialize(rawData: Json): T;
}

export type BasicTypes = Nested<
  number | string | boolean
  // | bigint
  // | Date
  // | RegExp
  // | Map<unknown, unknown>
  // | Set<unknown>
>;

export type Nested<T> = T | Nested<T>[] | { [key: string]: Nested<T> };

export type Json = Nested<number | string | boolean>;
