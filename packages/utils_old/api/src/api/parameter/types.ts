import { ParameterContext } from "../../context";
import { Nested } from "../../serialization";
import { TypeFunction, Call } from "../../type";
import { Parameter, PhantomParameter, LocatableParameter } from "./Parameter";

type MapInputReturnRecord<
  T extends Record<string, Nested<Parameter>>,
  Fn extends TypeFunction,
> = {
  [Key in keyof T]: MapInputReturn<T[Key], Fn>;
};

type MapInputReturnArray<
  T extends Nested<Parameter>[],
  Fn extends TypeFunction,
> = T extends [
  infer Head extends Nested<Parameter>,
  ...infer Tail extends Nested<Parameter>[],
]
  ? [MapInputReturn<Head, Fn>, ...MapInputReturnArray<Tail, Fn>]
  : [];

type MapInputReturn<
  T extends Nested<Parameter>,
  Fn extends TypeFunction,
> = T extends Nested<Parameter>[]
  ? MapInputReturnArray<T, Fn>
  : T extends Record<string, Nested<Parameter>>
  ? MapInputReturnRecord<T, Fn>
  : T extends Parameter
  ? Call<Fn, T>
  : never;

interface GetInputType extends TypeFunction {
  return: this["argument"] extends Parameter<infer T> ? T : never;
}

export type ValueTypeOf<Input extends Nested<Parameter>> = MapInputReturn<
  Input,
  GetInputType
>;

export interface PreviousParameter<
  T,
  Context extends ParameterContext = ParameterContext,
> extends PhantomParameter<T, Context>,
    LocatableParameter<T> {
  // ...
}

interface GetPreviousType extends TypeFunction {
  return: this["argument"] extends Parameter<infer T>
    ? PreviousParameter<T>
    : never;
}

export type PreviousTypeOf<Input extends Nested<Parameter>> = MapInputReturn<
  Input,
  GetPreviousType
>;
