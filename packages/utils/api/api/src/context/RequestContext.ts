import { ApiContext } from "./ApiContext";

export interface RequestContext extends ApiContext {
  headers: Headers;
}
