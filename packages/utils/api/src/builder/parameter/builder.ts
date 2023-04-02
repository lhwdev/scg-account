import { Parameter } from "../../api/parameter";
import {
  ParameterContext,
  RequestParameterContext,
  ResponseParameterContext,
} from "../../context";
import { Serializable, serializerOf } from "../../serialization";
import { ParameterSource, ParameterHandler } from "./types";

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
