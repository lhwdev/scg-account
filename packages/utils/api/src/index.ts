import { Action } from "./api/Action";
import { RequestContext, ResponseContext } from "./context";

export * from "./api";

export const inputHandlerSymbol = Symbol("inputHandler");

export type InputConstructor<T> =
  | { [inputHandlerSymbol]: InputHandler<T> }
  | InputHandler<T>;

export function inputHandlerOf<T>(
  constructor: InputConstructor<T>,
): InputHandler<T> {
  if (inputHandlerSymbol in constructor) {
    return constructor[inputHandlerSymbol];
  } else {
    return constructor;
  }
}

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

export type EntityActions<Input> = Record<
  string,
  Action<ActionResultHandler, Input>
>;

export interface InputHandler<
  T = unknown,
  Req extends RequestContext = RequestContext,
  Res extends ResponseContext = ResponseContext,
> {
  serialize(context: Req, data: T): Promise<void>;
  deserialize(context: Res): Promise<T>;
}

export interface ActionResultHandler<
  T = unknown,
  Res extends ResponseContext = ResponseContext,
  Req extends RequestContext = RequestContext,
> {
  serialize(context: Res, data: T): Promise<void>;
  deserialize(context: Req): Promise<T>;
}
