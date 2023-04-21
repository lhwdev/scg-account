import { Parameter } from "./Parameter";

export interface InputParameters<T> extends Parameter<T, RequestContext> {
  hello: "world";
}
