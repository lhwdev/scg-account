import { ApiContext } from "@scg-utils/api";

export abstract class Parameter<T, Context extends ApiContext> {
  abstract serialize(to: Context, value: T): void;
  abstract deserialize(from: Context): T;
}
