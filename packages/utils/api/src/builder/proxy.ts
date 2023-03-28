import {
  InMemoryJsonRawBody,
  RequestContext,
  ResponseContext,
} from "../context";
import { ParameterSource, RequestProxy, ResponseProxy } from "./input";

// request

function requestProxyOf(name: "pathParams" | "queryParams") {
  return new Proxy<Record<string, ParameterSource<RequestContext>>>(
    {},
    {
      get(_target, p, _receiver): ParameterSource<RequestContext> {
        if (typeof p !== "string") throw Error("cannot index by symbol");

        return {
          async serialize(context, data) {
            context[name][p] = JSON.stringify(data);
          },
          async deserialize(context) {
            return JSON.parse(context[name][p]);
          },
        };
      },
    },
  );
}

class RequestProxyImpl implements RequestProxy {
  pathParams: Record<string, ParameterSource<RequestContext>> =
    requestProxyOf("pathParams");
  queryParams: Record<string, ParameterSource<RequestContext>> =
    requestProxyOf("queryParams");
  headers: Record<string, ParameterSource<RequestContext>> = new Proxy<
    Record<string, ParameterSource<RequestContext>>
  >(
    {},
    {
      get(_target, p, _receiver): ParameterSource<RequestContext> {
        if (typeof p !== "string") throw Error("cannot index by symbol");

        return {
          async serialize(context, data) {
            context.headers.set(p, JSON.stringify(data));
          },
          async deserialize(context) {
            return JSON.parse(context.headers.get(p));
          },
        };
      },
    },
  );

  body: ParameterSource<RequestContext> = {
    async serialize(context, data) {
      context.body = new InMemoryJsonRawBody(data);
    },
    async deserialize(context) {
      const body = context.body;
      if (body === undefined) {
        throw Error("Expected body, got no body");
      }
      return await body.json();
    },
  };
}

export const requestProxyImpl = new RequestProxyImpl();

// response

class ResponseProxyImpl implements ResponseProxy {
  body: ParameterSource<ResponseContext> = {
    async serialize(context, data) {
      context.body = new InMemoryJsonRawBody(data);
    },
    async deserialize(context) {
      const body = context.body;
      if (body === undefined) {
        throw Error("Expected body, got no body");
      }
      return await body.json();
    },
  };
}
