export type ApiManager = {
  method: string | number | symbol;
  metadata: Record<string | number | symbol, unknown | undefined> & {
    deprecated?: Deprecated;
  };
  paramHandler: 
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
  | "submit"
  | "stream";

export type ApiLibrary<Manager extends ApiManager> = {
  [index in Path]?: Api<Manager>;
} & ApiCommon<Manager>;

export type ApiEntity<Manager extends ApiManager> = {
  [method in Manager["method"]]?: ApiCallable<Manager, never, unknown>;
} & ApiCommon<Manager>;

export type Method = string;

export type Params = Record<string, unknown>

export const ParamHandlerSymbol = Symbol("ParamHandler")

type ParamHandler<Manager extends ApiManager, T> = { [ParamHandlerSymbol]:  }

export interface ApiCallable<Manager extends ApiManager, in P extends Params, out R>
  extends ApiCommon<Manager> {
  
  
}

export type Api<Manager extends ApiManager> =
  | ApiLibrary<Manager>
  | ApiEntity<Manager>
  | ApiCallable<Manager, never, unknown>;
