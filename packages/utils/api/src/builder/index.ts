// index.ts mimic but builder edition

import { Procedure } from "../api/Procedure";

export * from "./input";

export * from "../api/Procedure";
export * from "./EntityBuilder";

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
  procedure = new Procedure(_request => ({}));
}

export function routes<const Record extends RoutesRecord>(
  routes: Record,
): Routes<Record> {
  return { routes };
}
