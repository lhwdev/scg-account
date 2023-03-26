import { InputConstructor, InputHandler, inputHandlerOf } from "../index";
import { Json, Nested, Serializable, serializerSymbol } from "../serialization";

// builders

export function param<T>(
  serializable: Serializable<T>,
  parameter: RequestParameter,
): Parameter<T>;

export function param<T, Constructor extends InputConstructor<T>>(
  constructor: Constructor,
): Parameter<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function param(
  ...args:
    | [Serializable<unknown>, RequestParameter]
    | [InputConstructor<unknown>]
): Parameter {
  if (args.length == 2) {
    const [serializable, parameter] = args;
    const serializer = serializable[serializerSymbol];
    return {
      [handlerSymbol]: {
        serialize(context, data) {
          return parameter[handlerSymbol].serialize(
            context,
            serializer.serialize(data),
          );
        },
        async deserialize(context) {
          return serializer.deserialize(
            await parameter[handlerSymbol].deserialize(context),
          );
        },
      },
    };
  } else {
    const [constructor] = args;
    return { [handlerSymbol]: inputHandlerOf(constructor) };
  }
}

// types

interface RequestProxy {
  params: Record<string, RequestParameter>;
}

export const handlerSymbol = Symbol("handler");

export interface RequestParameter {
  [handlerSymbol]: InputHandler<Json>;
}

export interface Parameter<T = unknown> {
  [handlerSymbol]: InputHandler<T>;
}

export type InputFunction<Result extends InputType> = (
  request: RequestProxy,
) => Result;

export type InputType = Record<string, Nested<Parameter>>;

// 으악 유사 Visitor + mapping 구현하기가 이렇게 어려울수가
type MapInputReturnItem<T extends Parameter> = T extends Parameter<infer Inner>
  ? Inner
  : never;

type MapInputReturnRecord<T extends InputType> = {
  [Key in keyof T]: MapInputReturn<T[Key]>;
};

type MapInputReturnArray<T extends Nested<Parameter>[]> = T extends [
  infer Head extends Parameter,
  ...infer Tails extends Nested<Parameter>[],
]
  ? [MapInputReturnItem<Head>, ...MapInputReturnArray<Tails>]
  : [];

type MapInputReturn<T extends Nested<Parameter>> = T extends Nested<Parameter>[]
  ? MapInputReturnArray<T>
  : T extends Record<string, Nested<Parameter>>
  ? MapInputReturnRecord<T>
  : T extends Parameter
  ? MapInputReturnItem<T>
  : never;

export interface InputContainer<Input extends InputType> {
  input<const ResultParameters extends InputType>(
    handler: InputFunction<ResultParameters>,
  ): InputContainer<Input & ResultParameters>;
}
