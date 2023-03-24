import { Json } from "./index";

export class ApiContext {}

export interface RequestContext extends ApiContext {
  status: number;
  statusText: string;
  ok: boolean;
}

export interface ResponseContext extends ApiContext {
  pathParams: Record<string, string>;
  queryParams: Record<string, string>;

  headers: Headers;

  body: RawBody;
}

interface Headers extends Iterable<[Lowercase<string>, string]> {
  get(name: string): string;
}

interface RawBody {
  bodyUsed: boolean;

  json(): Promise<Json>;
  formData(): Promise<Record<string, string>>;
  arrayBuffer(): Promise<ArrayBuffer>;
  // stream(): Promise<ReadableStream>; // no such a thing in node.js
}
