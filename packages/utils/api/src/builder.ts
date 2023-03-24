// index.ts mimic but builder edition

import { InputConstructor } from ".";

type Route = Routes<RoutesRecord> | Entity | ActionRoute;

type RoutesRecord = { [key: string]: Route };

type Routes<T extends RoutesRecord> = {
  routes: T;
};

type ActionRoute<A extends Action = Action> = {
  action: A;
};

type Entity<Actions extends Record<string, Action> = Record<string, Action>> = {
  actions: Actions;
};

type Action = {};

export function createHttpApiBuilder(): HttpApiBuilder {
  return new HttpApiBuilder();
}

class HttpApiBuilder {
  procedure = new Procedure();
}

interface RequestProxy {
  params: Record<string, RequestParameter>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RequestParameter {}

type InputFunction<Request extends RequestProxy, Result extends {}> = (
  request: Request,
) => Result;

class Procedure<
  Request extends RequestProxy = RequestProxy,
  Input extends {} = {},
> {
  input<const Request2 extends RequestProxy, const Result extends {}>(
    _handler: InputFunction<Request2, Result>,
  ): Procedure<Request & Request2, Input & Result> {
    throw "TODO";
  }
}

export function routes<const Record extends RoutesRecord>(
  routes: Record,
): Routes<Record> {
  return { routes };
}

export function param<T, Constructor extends InputConstructor<T>>(
  constructor: Constructor,
  parameter: RequestParameter,
): T {}
