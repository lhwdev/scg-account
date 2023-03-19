export type ApiManager = {
  method: string | number | symbol;
  metadata: Record<string | number | symbol, unknown | undefined> & {
    deprecated?: Deprecated;
  };
  paramInput: unknown,
  paramHandler(state: typeof this.paramInput): never;
  resultHandler(state: typeof this.paramInput): never;

  __thisIsOnlyForType: never;
};

export type ApiCommon<Manager extends ApiManager> = {
  metadata: Manager["metadata"];
};

export type Deprecated = {
  reason: string;
  replaceWith: string;
};

export type Path =
  | "get" | "create" | "update" | "delete" // CRUD
  | "list" | "paginate" // CRUD - list
  | "submit" | "upload"
  | "stream";

export type ApiLibrary<Manager extends ApiManager> = {
  [index in Path]?: Api<Manager>;
} & ApiCommon<Manager>;

export type ApiEntity<Manager extends ApiManager> = {
  [method in Manager["method"]]?: ApiCallable<Manager, never, ResultHandler<Manager, unknown> | undefined>;
} & ApiCommon<Manager>;

export type Method = string;

export type Params<Manager extends ApiManager> = Record<string, ParamHandler<Manager, unknown>>

export const ParamHandlerSymbol = Symbol("ParamHandler")

type ParamHandler<Manager extends ApiManager, T> = Manager["paramHandler"] & ((...args: never[]) => T)

type ResultHandler<Manager extends ApiManager, R> = Manager["resultHandler"] & ((...args: never[]) => R)

export interface ApiCallable<Manager extends ApiManager, P extends Params<Manager>, R extends ResultHandler<Manager, unknown> | undefined>
  extends ApiCommon<Manager> {
  params: P
  result: R
}

export type Api<Manager extends ApiManager> =
  | ApiLibrary<Manager>
  | ApiEntity<Manager>
  | ApiCallable<Manager, never, ResultHandler<Manager, unknown> | undefined>;
