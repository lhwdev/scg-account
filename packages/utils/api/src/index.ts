import { RequestContext, ResponseContext } from "./context";

export const inputHandlerSymbol = Symbol("inputHandler");

export type InputConstructor<T> =
  | { [inputHandlerSymbol]: InputHandler<T> }
  | InputHandler<T>;

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

export class Entity<
  Actions extends EntityActions<Input>,
  Input = {},
> extends Route<Input> {
  parent: Routes<RoutesRecord> | undefined;

  constructor(name: string, input: Input, public actions: Actions) {
    super(name, input);
  }
}

export class Action<
  Result extends ActionResultHandler = ActionResultHandler,
  Input = {},
> implements RouteInterface<Input>
{
  constructor(
    public name: string,
    public input: Input,
    public result: Result,
  ) {}
}

export class ActionRoute<A extends Action, Input = {}> extends Route<Input> {
  constructor(public action: A, input: Input) {
    super(action.name, input);
  }
}

export interface InputHandler<
  T = unknown,
  Req extends RequestContext = RequestContext,
  Res extends ResponseContext = ResponseContext,
> {
  serialize(context: Req, data: T): Promise<void> | void;
  deserialize(context: Res): Promise<T> | T;
}

export interface ActionResultHandler<
  T = unknown,
  Res extends ResponseContext = ResponseContext,
  Req extends RequestContext = RequestContext,
> {
  serialize(context: Res, data: T): Promise<void> | void;
  deserialize(context: Req): Promise<T> | T;
}

export const serializerSymbol = Symbol("serializerOf");

export type Serializable = BasicTypes | SerializableObject;

export interface SerializableObject {
  [serializerSymbol]: Serializer<this>;
}

export interface Serializer<T> {
  serialize(data: T): Json;
  deserialize(rawData: Json): T;
}

export type BasicTypes = Nested<
  | number
  | string
  | boolean
  | bigint
  | Date
  | RegExp
  | Map<unknown, unknown>
  | Set<unknown>
>;

export type Nested<T> = (T | Nested<T>)[] | { [key: string]: T | Nested<T> };

export type Json = Nested<number | string | boolean>;
