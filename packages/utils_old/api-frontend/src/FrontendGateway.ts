import { ActionType, Headers, RawBody } from "@scg-utils/api";

export interface FrontendRequest {
  path: string;
  type: ActionType;
  queryParams: Record<string, string>;
  headers: Headers;
  body?: RawBody;
}

export interface FrontendResponse {
  headers: Headers;
  body?: RawBody;
}

export interface FrontendGateway {
  send(request: FrontendRequest): Promise<FrontendResponse>;
}
