import { ApiContext, RequestContext, ResponseContext } from "../context";
import { Json, Nested, Serializable, serializerOf } from "../serialization";
import { Modify } from "../type";

// handler functions

export interface RequestProxy {
  // TODO: headers
  pathParams: Record<string, ParameterSource<RequestContext>>;
  queryParams: Record<string, ParameterSource<RequestContext>>;

  headers: Record<string, ParameterSource<RequestContext>>;

  body: ParameterSource<RequestContext>;
}

export interface ResponseProxy {
  headers: Record<string, ParameterSource<ResponseContext>>;

  body: ParameterSource<ResponseContext>;
}

export type InputParameters = Record<
  string,
  Nested<Parameter<unknown, RequestContext>>
>;

export type InputFunction<T extends InputParameters = InputParameters> = (
  request: RequestProxy,
  previous: PreviousProxy,
) => T;

export type ResultParameters = Nested<Parameter<unknown, ResponseContext>>;

export type ResultFunction<T extends ResultParameters = ResultParameters> = (
  response: ResponseProxy,
) => T;

// more types around handler functions

type MapInputReturnItem<T extends Parameter> = T extends Parameter<infer Inner>
  ? Inner
  : never;

type MapInputReturnRecord<T extends Record<string, Nested<Parameter>>> = {
  [Key in keyof T]: MapInputReturn<T[Key]>;
};

type MapInputReturnArray<T extends Nested<Parameter>[]> = T extends [
  infer Head extends Nested<Parameter>,
  ...infer Tail extends Nested<Parameter>[],
]
  ? [MapInputReturn<Head>, ...MapInputReturnArray<Tail>]
  : [];

type MapInputReturn<T extends Nested<Parameter>> = T extends Nested<Parameter>[]
  ? MapInputReturnArray<T>
  : T extends Record<string, Nested<Parameter>>
  ? MapInputReturnRecord<T>
  : T extends Parameter
  ? MapInputReturnItem<T>
  : never;

export type InputTypeOf<Input extends Record<string, Nested<Parameter>>> =
  MapInputReturnRecord<Input>;

export class InputContainer<Input extends InputParameters = InputParameters> {
  constructor(public value: Input) {}

  input<const Input2 extends InputParameters>(
    handler: InputFunction<Input2>,
  ): InputContainer<Modify<Input, Input2>> {
    throw `TODO input(${handler})`;
  }
}

export interface InputContainerWrapper<Input extends InputParameters> {
  input<const Input2 extends InputParameters>(
    handler: InputFunction<Input2>,
  ): InputContainerWrapper<Modify<Input, Input2>>;
}

// inside handler functions

/**
 * @example param(User, request.pathParams.id)
 * @example param(User, request.headers.authentication)
 *
 * @example param(UserData, response.body)
 * @example param(User.Authentication, response.haeders["set-cookie"])
 */
export function param<T, Context extends ApiContext>(
  serializable: Serializable<T>,
  parameter: ParameterSource<Context>,
): Parameter<T, Context>;

/**
 * @example param(User.asInput("authenticated"))
 */
export function param<
  T,
  Constructor extends ParameterHandler<T, RequestContext>,
>(constructor: Constructor): Parameter<T, RequestContext>;

/**
 * @example param(User.Data.asResult({ santinization: true })) // read all information of that user which is accessible from user subject(provided by Authentication)
 */
export function param<
  T,
  Constructor extends ParameterHandler<T, ResponseContext>,
>(constructor: Constructor): Parameter<T, ResponseContext>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function param(
  ...args:
    | [Serializable<unknown>, ParameterSource<ApiContext>]
    | [ParameterHandler<unknown, ApiContext>]
): Parameter<unknown, ApiContext> {
  if (args.length == 2) {
    const [serializable, parameter] = args;
    const serializer = serializerOf(serializable);
    return {
      [handlerSymbol]: {
        serialize(context, data) {
          return parameter.serialize(context, serializer.serialize(data));
        },
        async deserialize(context) {
          return serializer.deserialize(await parameter.deserialize(context));
        },
      },
    };
  } else {
    const [constructor] = args;
    return { [handlerSymbol]: constructor };
  }
}

export interface ParameterSource<Context extends ApiContext> {
  serialize(context: Context, data: Json): Promise<void>;
  deserialize(context: Context): Promise<Json>;
}

export const handlerSymbol = Symbol("handler");

export interface Parameter<
  T = unknown,
  Context extends ApiContext = ApiContext,
> {
  [handlerSymbol]: ParameterHandler<T, Context>;
}

export interface ParameterHandler<T, Context extends ApiContext> {
  serialize(context: Context, data: T): Promise<void>;
  deserialize(context: Context): Promise<T>;
}
