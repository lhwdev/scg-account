import { ApiContext } from "./ApiContext";
import { RequestHeaders } from "./Headers";

export interface RequestContext extends ApiContext {
  headers: RequestHeaders;
}
