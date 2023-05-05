import { MutableRequestHeaders, RequestHeaders } from "../http/Headers";
import { Body } from "../http/Body";
import {
  HttpContext,
  IncomingHttpContext,
  OutgoingHttpContext,
} from "./HttpContext";
import { MutableTrailers, Trailers } from "../http/Trailers";

export interface RequestContext extends HttpContext {
  readonly url: URL;

  readonly headers: RequestHeaders;

  readonly trailers: Trailers;

  readonly body: Body | undefined;
}

export interface IncomingRequestContext
  extends RequestContext,
    IncomingHttpContext {
  readonly headers: RequestHeaders;

  readonly trailers: Trailers;
}

export interface OutgoingRequestContext
  extends RequestContext,
    OutgoingHttpContext {
  readonly headers: MutableRequestHeaders;

  readonly trailers: MutableTrailers;

  body: Body | undefined;
}
