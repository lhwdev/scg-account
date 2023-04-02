// index.ts mimic but builder edition

import { Procedure } from "../api/Procedure";
import { InputParameters } from "../api/input";
import { BuilderRoutesRecord, RoutesBuilder } from "./RoutesBuilder";
import { EmptyInputContainer, InputContainer } from "./input";

export * from "./input";

export * from "../api/Procedure";

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
