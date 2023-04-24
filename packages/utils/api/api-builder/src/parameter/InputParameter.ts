import { RequestContext } from "@scg-utils/api";
import { Parameter } from "./Parameter";

export interface InputParameters<T> extends Parameter<T, ee> {
  hello: "world";
}
