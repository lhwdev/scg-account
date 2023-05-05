import { Headers, MutableHeaders } from "../http";
import { Body } from "../http/Body";
import { MutableTrailers, Trailers } from "../http/Trailers";

export interface HttpContext {
  readonly url: URL;

  readonly headers: Headers;

  readonly trailers: Trailers;

  readonly body: Body | undefined;
}

export interface OutgoingHttpContext extends HttpContext {
  readonly headers: MutableHeaders;

  readonly trailers: MutableTrailers;
}

export interface IncomingHttpContext extends HttpContext {
  a: 1;
}
