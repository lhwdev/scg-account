// index.ts mimic but builder edition

import { Procedure } from "../api/Procedure";
import { Routes } from "../api/Routes";
import { ActionBuilder } from "./ActionBuilder";
import { EntityBuilder } from "./EntityBuilder";

export * from "./input";

export * from "../api/Procedure";
export * from "./EntityBuilder";

type BuilderRoute =
  | RoutesBuilder<BuilderRoutesRecord>
  | EntityBuilder
  | ActionBuilder;

type BuilderRoutesRecord = { [key: string]: BuilderRoute };

class RoutesBuilder<T extends BuilderRoutesRecord> {
  constructor(public routes: T) {}

  build(): Routes<{ [Route in keyof T]: ReturnType<Route["build"]> }>;
}

export function createHttpApiBuilder(): HttpApiBuilder {
  return new HttpApiBuilder();
}

class HttpApiBuilder {
  procedure = new Procedure({});

  buildHttpApi<const Record extends BuilderRoutesRecord>(routesRecord: Record) {
    routes(routesRecord);
  }
}

export function routes<const Record extends BuilderRoutesRecord>(
  routes: Record,
): RoutesBuilder<Record> {
  return new RoutesBuilder(routes);
}
