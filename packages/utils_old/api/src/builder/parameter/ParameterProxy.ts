import { Parameter } from "../../api/parameter";
import {
  RequestParameterContext,
  ParameterContext,
  ResponseParameterContext,
} from "../../context";
import { Nested } from "../../serialization";
import { ParameterSource } from "./types";

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
