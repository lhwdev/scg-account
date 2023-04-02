export const serializerSymbol = Symbol("serializerOf");

export type Serializable<T, RawType extends Json = Json> =
  | {
      [serializerSymbol]: Serializer<T, RawType>;
    }
  | Serializer<T, RawType>;

export function serializerOf<T>(serializable: Serializable<T>) {
  if (serializerSymbol in serializable) {
    return serializable[serializerSymbol];
  } else {
    return serializable;
  }
}

export interface Serializer<T, RawType extends Json = Json> {
  serialize(data: T): RawType;
  deserialize(rawData: RawType): T;
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
