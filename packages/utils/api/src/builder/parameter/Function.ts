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

export type ResultFunction<T extends ResultParameters = ResultParameters> = (
  response: ResponseParameterProxy,
) => T;
