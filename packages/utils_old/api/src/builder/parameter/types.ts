import { ParameterContext } from "../../context";
import { Json } from "../../serialization";

export interface ParameterHandler<T, Context extends ParameterContext> {
  serialize(context: Context, data: T): Promise<void>;
  deserialize(context: Context): Promise<T>;
}

export interface ParameterSource<Context extends ParameterContext> {
  serialize(context: Context, data: Json): Promise<void>;
  deserialize(context: Context): Promise<Json>;
}
