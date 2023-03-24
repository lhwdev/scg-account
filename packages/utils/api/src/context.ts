import { Json } from "./index";

export class ApiContext {}

export interface RequestContext extends ApiContext {
  pathParams: Record<string, string>;
  queryParams: Record<string, string>;

  headers: Headers;

  body: RawBody;
}

export interface ResponseContext extends ApiContext {
  readonly pathParams: Record<string, string>;
  readonly queryParams: Record<string, string>;

  readonly headers: Headers;

  readonly body: RawBody;
}

interface Headers extends Iterable<[Lowercase<string>, string]> {
  get(name: string): string;
}

interface MutableHeaders extends Headers {
  set(name: string, value: string): void;
}

interface RawBody {
  bodyUsed: boolean;

  json(): Promise<Json>;
  formData(): Promise<Record<string, string>>;
  arrayBuffer(): Promise<ArrayBuffer>;
  // stream(): Promise<ReadableStream>; // no such a thing in node.js
}
