// index.ts mimic but builder edition

export * from "./ActionBuilder";
export * from "./EntityBuilder";
export * from "./parameter";
export * from "./proxy";
export * from "./RoutesBuilder";

import { Procedure } from "../api/Procedure";
import { InputParameters } from "../api/parameter";
import { BuilderRoutesRecord, RoutesBuilder } from "./RoutesBuilder";
import { EmptyInputContainer, InputContainer } from "./parameter";

export function createHttpApiBuilder(): HttpApiBuilder {
  return new HttpApiBuilder();
}

class HttpApiBuilder {
  procedure = new Procedure({
    input: EmptyInputContainer,
  });

  buildHttpApi<const Record extends BuilderRoutesRecord>(routesRecord: Record) {
    return routes(EmptyInputContainer, routesRecord);
  }
}

export function routes<
  const Input extends InputParameters,
  const Record extends BuilderRoutesRecord,
>(input: InputContainer<Input>, routes: Record): RoutesBuilder<Input, Record> {
  return new RoutesBuilder({
    input,
    items: routes,
  });
}
