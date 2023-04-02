import {
  Parameter,
  InputParameters,
  ResultParameters,
  PhantomParameter,
  LocatableParameter,
} from "../api/input";
import {
  ParameterContext,
  RequestParameterContext,
  ResponseParameterContext,
} from "../context";
import { Json, Nested, Serializable, serializerOf } from "../serialization";
import { Call, Modify, TypeFunction } from "../type";
import { previousParameterProxyImpl, requestParameterProxyImpl } from "./proxy";

// handler functions

export interface RequestParameterProxy {
  // TODO: headers
  pathParams: Record<string, ParameterSource<RequestParameterContext>>;
  queryParams: Record<string, ParameterSource<RequestParameterContext>>;

  headers: Record<string, ParameterSource<RequestParameterContext>>;

  body: ParameterSource<RequestParameterContext>;
}

export type PreviousParameterProxy = Nested<
  Parameter<unknown, ParameterContext>
>;

export interface ResponseParameterProxy {
  headers: Record<string, ParameterSource<ResponseParameterContext>>;

  body: ParameterSource<ResponseParameterContext>;
}

export type InputFunction<
  T extends InputParameters = InputParameters,
  Previous extends InputParameters = InputParameters,
> = (request: RequestParameterProxy, previous: PreviousTypeOf<Previous>) => T;

export type ResultFunction<T extends ResultParameters = ResultParameters> = (
  response: ResponseParameterProxy,
) => T;

export class InputContainer<
  Input extends InputParameters = InputParameters,
  Parent extends InputParameters = InputParameters,
> {
  constructor(public parent: InputContainer<Parent>, public value: Input) {}

  withInput<const Input2 extends InputParameters>(
    handler: InputFunction<Input2, Input>,
  ): InputContainer<Modify<Input, Input2>, Input> {
    // tiny optimization
    const input2: Input2 =
      handler.length === 1
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (handler as any)(requestParameterProxyImpl)
        : handler(
            requestParameterProxyImpl,
            previousParameterProxyImpl(this.value),
          );

    return new InputContainer(this, {
      ...this.value,
      ...input2,
    });
  }
}

export const EmptyInputContainer = new InputContainer(
  undefined as unknown as InputContainer,
  {},
);
EmptyInputContainer.parent = EmptyInputContainer;

export interface InputContainerWrapper<Input extends InputParameters> {
  input<const Input2 extends InputParameters>(
    handler: InputFunction<Input2, Input>,
  ): InputContainerWrapper<Modify<Input, Input2>>;
}

// inside handler functions

export interface ParameterHandler<T, Context extends ParameterContext> {
  serialize(context: Context, data: T): Promise<void>;
  deserialize(context: Context): Promise<T>;
}

/**
 * @example param(User, request.pathParams.id)
 * @example param(User, request.headers.authentication)
 *
 * @example param(UserData, response.body)
 * @example param(User.Authentication, response.haeders["set-cookie"])
 */
export function param<T, Context extends ParameterContext>(
  serializable: Serializable<T>,
  parameter: ParameterSource<Context>,
): Parameter<T, Context>;

/**
 * @example param(User.asInput("authenticated"))
 */
export function param<
  T,
  Constructor extends ParameterHandler<T, RequestParameterContext>,
>(constructor: Constructor): Parameter<T, RequestParameterContext>;

/**
 * @example param(User.Data.asResult({ santinization: true })) // read all information of that user which is accessible from user subject(provided by Authentication)
 */
export function param<
  T,
  Constructor extends ParameterHandler<T, ResponseParameterContext>,
>(constructor: Constructor): Parameter<T, ResponseParameterContext>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function param(
  ...args:
    | [Serializable<unknown>, ParameterSource<ParameterContext>]
    | [ParameterHandler<unknown, ParameterContext>]
): Parameter<unknown, ParameterContext> {
  if (args.length == 2) {
    const [serializable, parameter] = args;
    const serializer = serializerOf(serializable);
    return new (class extends Parameter<unknown, ParameterContext> {
      serialize(context: ParameterContext, data: unknown) {
        return parameter.serialize(context, serializer.serialize(data));
      }
      async deserialize(context: ParameterContext) {
        return serializer.deserialize(await parameter.deserialize(context));
      }
    })();
  } else {
    const [constructor] = args;
    return new (class extends Parameter<unknown, ParameterContext> {
      serialize(context: ParameterContext, data: unknown): Promise<void> {
        return constructor.serialize(context, data);
      }
      deserialize(context: ParameterContext): Promise<unknown> {
        return constructor.deserialize(context);
      }
    })();
  }
}

export interface ParameterSource<Context extends ParameterContext> {
  serialize(context: Context, data: Json): Promise<void>;
  deserialize(context: Context): Promise<Json>;
}

// more types around handler functions

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

interface GetPreviousType extends TypeFunction {
  return: this["argument"] extends Parameter<infer T>
    ? PhantomParameter<T> & LocatableParameter<T>
    : never;
}

export type PreviousTypeOf<Input extends Nested<Parameter>> = MapInputReturn<
  Input,
  GetPreviousType
>;
