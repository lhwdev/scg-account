import { InputValue, InputValueContainer } from "./api/parameter";
import { Json } from "./serialization";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ApiContext {}

export interface ParameterContext extends ApiContext {
  inputValues: InputValueContainer<InputValue>;
}

export interface RequestContext extends ApiContext {
  pathParams: Record<string, string>;
  queryParams: Record<string, string>;

  headers: MutableHeaders;

  body?: RawBody;
}

export type RequestParameterContext = ParameterContext & RequestContext;

export interface ResponseContext extends ApiContext {
  request: RequestParameterContext;

  headers: MutableHeaders;

  body: RawBody | undefined;
}

export type ResponseParameterContext = ParameterContext & ResponseContext;

export interface Headers extends Iterable<[Lowercase<string>, string]> {
  get(name: string): string;
}

export interface MutableHeaders extends Headers {
  set(name: string, value: string): void;
}

export interface RawBody {
  bodyUsed: boolean;

  json(): Promise<Json>;
  formData(): Promise<Record<string, string>>;
  arrayBuffer(): Promise<ArrayBuffer>;
  // stream(): Promise<ReadableStream>; // no such a thing in node.js
}

export class InMemoryJsonRawBody implements RawBody {
  bodyUsed = false;

  constructor(public data: Json) {}

  json(): Promise<Json> {
    this.bodyUsed = true;
    return Promise.resolve(this.data);
  }

  formData(): Promise<Record<string, string>> {
    throw "todo";
  }

  arrayBuffer(): Promise<ArrayBuffer> {
    throw "todo";
  }
}