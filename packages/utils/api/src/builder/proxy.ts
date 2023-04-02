import {
  InputParameters,
  InputValue,
  LocatableParameter,
  Parameter,
  PhantomParameter,
  PreviousTypeOf,
} from "../api/parameter";
import {
  InMemoryJsonRawBody,
  ParameterContext,
  RequestParameterContext,
  ResponseParameterContext,
} from "../context";
import {
  ParameterSource,
  RequestParameterProxy,
  ResponseParameterProxy,
} from "./parameter";

// request

function immmutableProxy<T extends object>(
  enumerable: boolean,
  handler: ProxyHandler<T>,
): ProxyHandler<T> {
  function thisIsImmutable(): never {
    throw new Error("modification not allowed for proxy");
  }

  return {
    getOwnPropertyDescriptor(target, p) {
      return {
        enumerable,
        writable: false,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        get: () => this.get!(target, p, undefined),
      };
    },
    set(_target, _p, _newValue, _receiver) {
      thisIsImmutable();
    },
    defineProperty(_target, _property, _attributes) {
      thisIsImmutable();
    },
    deleteProperty(_target, _p) {
      thisIsImmutable();
    },
    setPrototypeOf(_target, _v) {
      thisIsImmutable();
    },
    ...handler,
  };
}

function requestParameterProxyOf(name: "pathParams" | "queryParams") {
  return new Proxy<Record<string, ParameterSource<RequestParameterContext>>>(
    {},
    immmutableProxy(false, {
      get(
        _target,
        p,
        _receiver,
      ): ParameterSource<RequestParameterContext> | undefined {
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
      has(_target, p) {
        return typeof p === "string";
      },
    }),
  );
}

class RequestParameterProxyImpl implements RequestParameterProxy {
  pathParams: Record<string, ParameterSource<RequestParameterContext>> =
    requestParameterProxyOf("pathParams");
  queryParams: Record<string, ParameterSource<RequestParameterContext>> =
    requestParameterProxyOf("queryParams");
  headers: Record<string, ParameterSource<RequestParameterContext>> = new Proxy<
    Record<string, ParameterSource<RequestParameterContext>>
  >(
    {},
    immmutableProxy(false, {
      get(
        _target,
        p,
        _receiver,
      ): ParameterSource<RequestParameterContext> | undefined {
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
      has(_target, p) {
        return typeof p === "string";
      },
    }),
  );

  body: ParameterSource<RequestParameterContext> = {
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

export const requestParameterProxyImpl = new RequestParameterProxyImpl();

// response

class ResponseParameterProxyImpl implements ResponseParameterProxy {
  headers: Record<string, ParameterSource<ResponseParameterContext>> =
    new Proxy<Record<string, ParameterSource<ResponseParameterContext>>>(
      {},
      immmutableProxy(false, {
        get(
          _target,
          p,
          _receiver,
        ): ParameterSource<ResponseParameterContext> | undefined {
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
        has(_target, p) {
          return typeof p === "string";
        },
      }),
    );

  body: ParameterSource<ResponseParameterContext> = {
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

export const responseParamterProxyImpl = new ResponseParameterProxyImpl();

export function previousParameterProxyImpl<Input extends InputParameters>(
  previous: Input,
): PreviousTypeOf<Input> {
  // I FORGAVE TO GIVE TYPES
  // INSTEAD OF TYPES, LET'S WRITE TESTS! WOW

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newProxy = (current: any, getCurrent: (input: any) => any): any =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new Proxy<any>(
      current,
      immmutableProxy(true, {
        get(_target, p, _receiver) {
          if (typeof p !== "string") return undefined;

          const item = current[p];
          if (item === undefined) {
            return undefined;
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const getNewCurrent = (input: any) => getCurrent(input)[p];

          if (item instanceof Parameter) {
            return new (class
              extends PhantomParameter
              implements LocatableParameter
            {
              async deserialize(context: ParameterContext) {
                return getCurrent(context.inputValues.rootValue);
              }

              locateParameterValue(value: InputValue): unknown {
                return getCurrent(value);
              }
            })();
          }

          return newProxy(item, getNewCurrent);
        },
      }),
    );
  return newProxy(previous, input => input);
}
