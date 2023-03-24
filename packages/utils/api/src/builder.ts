class HttpApiBuilder {}

// index.ts mimic but builder edition

type Route = Routes<RoutesRecord> | Entity | ActionRoute;

type RoutesRecord = { [key: string]: Route };

type Routes<T extends RoutesRecord> = {
  items: T;
};

type ActionRoute<A extends Action = Action> = {
  action: A;
};

type Entity<Actions extends Record<string, Action> = Record<string, Action>> = {
  actions: Actions;
};

type Action = {};
