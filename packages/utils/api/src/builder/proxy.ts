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
      get(_target, p, _receiver): ParameterSource<RequestContext> | undefined {
        if (typeof p !== "string") return undefined;

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
      get(_target, p, _receiver): ParameterSource<RequestContext> | undefined {
        if (typeof p !== "string") return undefined;

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
  headers: Record<string, ParameterSource<ResponseContext>> = new Proxy<
    Record<string, ParameterSource<ResponseContext>>
  >(
    {},
    {
      get(_target, p, _receiver): ParameterSource<ResponseContext> | undefined {
        if (typeof p !== "string") return undefined;

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

export const responseProxyImpl = new ResponseProxyImpl();
