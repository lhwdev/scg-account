import {
  InputParameters,
  PreviousTypeOf,
  ResultParameters,
} from "../../api/parameter";
import {
  RequestParameterProxy,
  ResponseParameterProxy,
} from "./ParameterProxy";

export type InputFunction<
  T extends InputParameters = InputParameters,
  Previous extends InputParameters = InputParameters,
> = (request: RequestParameterProxy, previous: PreviousTypeOf<Previous>) => T;

export type AnyInputFunction = InputFunction<InputParameters, never>;

export type InputFunctionTypes<Fn extends AnyInputFunction> =
  Fn extends InputFunction<
    infer T extends InputParameters,
    infer Previous extends InputParameters
  >
    ? {
        T: T;
        Previous: Previous;
      }
    : never;

export type ResultFunction<T extends ResultParameters = ResultParameters> = (
  response: ResponseParameterProxy,
) => T;
