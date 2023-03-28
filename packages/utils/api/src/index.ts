export * from "./api";

export interface RouteInterface<Input = {}> {
  name: string;
  input: Input;
}

export class Route<Input = {}> implements RouteInterface<Input> {
  parent?: Routes<RoutesRecord>;

  constructor(public name: string, public input: Input) {}
}

export type RoutesRecord<Input = {}> = Record<string, Route<Input>>;

export class Routes<T extends RoutesRecord, Input = {}> extends Route<Input> {
  parent: Routes<RoutesRecord> | undefined;

  constructor(name: string, input: Input, public items: T) {
    super(name, input);
  }
}
