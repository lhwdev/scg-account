// Reference: https://www.iana.org/assignments/http-fields/http-fields.xhtml
// handcrafted carefully from these iana list and rfc documents.
// Not exhaustive list of http header fields(request/response)
// 이 노가다 한 이유: HTTP 공부하려고(...)
export type PredefinedRequestHeaders = {
  // basic
  host?: string;
  origin?: string; // rfc6454: The Web Origin Concept
  referer?: string;
  from?: string;
  via?: string;
  "user-agent"?: string;

  connection?: string;
  "keep-alive"?: string;
  "max-forwards"?: string;
  trailer?: string;

  // content
  "content-type"?: string;
  "content-encoding"?: string;
  "content-length"?: string;
  "content-range"?: string;
  "content-location"?: string;
  "transfer-encoding"?: string;

  // content negotiation
  accept?: string;
  "accept-encoding"?: string;
  "accept-patch"?: string;
  "accept-post"?: string;
  te?: string; // or 'accept-transfer-encoding'

  "accept-language"?: string;

  prefer?: string; // rfc7240: Prefer Header for HTTP

  negotiate?: string; // rfc2295: Transparent Content Negotiation in HTTP
  "accept-features"?: string; // rfc2295: Transparent Content Negotiation in HTTP

  "accept-datetime"?: string; // rfc7089: HTTP Framework for Time-Based Access to Resource States

  "if-match"?: string;
  "if-none-match"?: string;
  "if-modified-since"?: string;
  "if-unmodified-since"?: string;
  "if-range"?: string;

  // content hints
  range?: string;
  "alt-used"?: string; // rfc7848: HTTP Alternative Services
  "want-digest"?: string; // rfc3230: Instance Digests in HTTP

  // caching
  "cache-control"?: string; // rfc9111(5.2): HTTP Caching
  "clear-site-data"?: string; // w3 Clear Site Data

  // authorization
  authorization?: string;

  "proxy-authorization"?: string;

  // security
  expect?: string;

  "access-control-request-headers"?: string; // w3 Fetch: CORS-preflight request
  "access-control-request-method"?: string; // w3 Fetch: CORS-preflight request

  "sec-purpose"?: string; // w3 Fetch: `Sec-Purpose` Header

  // other
  cookie?: string[]; // rfc6295: HTTP State Management Mechanism

  "sec-websocket-key"?: string; // rfc6455: The WebSocket Protocol
  "sec-websocket-extensions"?: string; // rfc6455: The WebSocket Protocol
  "sec-websocket-protocol"?: string; // rfc6455: The WebSocket Protocol
  "sec-websocket-version"?: string; // rfc6455: The WebSocket Protocol

  forwarded?: string; // rfc7239: Forwarded HTTP Extension
  "last-event-id"?: string; // w3 HTML: Server-Sent events
  "ping-from"?: string; // w3 HTML: Hyperlink auditing
  "ping-to"?: string; // w3 HTML: Hyperlink auditing
  refresh?: string; //we HTML: metadata/Refresh state
};

export type PredefinedResponseHeaders = {
  // basic
  host?: string;
  location?: string;
  server?: string;
  via?: string;
  "surrogate-capability"?: string; // w3 Edge Architecture Specification
  "surrogate-control"?: string; // w3 Edge Architecture Specification

  connection?: string;
  "keep-alive"?: string;
  "retry-after"?: string;
  trailer?: string;
  upgrade?: string;

  deprecation?: string; // draft-ietf-httpapi-deprecation-header-02 (https://datatracker.ietf.org/doc/html/draft-ietf-httpapi-deprecation-header)
  sunset?: string; // rfc8594: The Sunset HTTP Header Field

  // debug
  "server-timing"?: string;

  // content
  date?: string;
  age?: string; // rfc9111(5.1): HTTP Caching
  expires?: string; // rfc9111(5.3): HTTP Caching
  "last-modified"?: string;

  "content-type"?: string;
  "content-encoding"?: string;
  "content-length"?: string;
  "content-range"?: string;
  "content-location"?: string;
  "transfer-encoding"?: string;
  "content-disposition"?: string; // rfc6266: Use of the Content-Disposition Header Field in the HTTP

  etag?: string;
  digest?: string; // rfc3230: Instance Digests in HTTP

  "preference-applied"?: string; // rfc7240: Prefer Header for HTTP

  "alt-svc"?: string; // rfc7848: HTTP Alternative Services

  "memento-datetime"?: string; // rfc7089: HTTP Framework for Time-Based Access to Resource States

  profile?: string; // rfc6906: The 'profile' Link Relation Type
  link?: string; // rfc8288: Web Linking
  "link-template"?: string; // draft-ietf-httpapi-link-template-02 (https://www.ietf.org/id/draft-ietf-httpapi-link-template-02.html)

  // content hints
  accept?: string;
  "accept-ch"?: string; // rfc8942: HTTP Client Hints
  vary?: string;

  tcn?: string; // rfc2295: Transparent Content Negotiation in HTTP
  alternates?: string; // rfc2295: Transparent Content Negotiation in HTTP
  "variant-vary"?: string; // rfc2295: Transparent Content Negotiation in HTTP

  // caching
  "cache-control"?: string; // rfc9111(5.2): HTTP Caching
  "cache-status"?: string; // rfc9211: The Cache-Status HTTP Response Header Field

  // authorization
  "www-authenticate"?: string;
  "authorization-info"?: string;

  "proxy-authenticate"?: string;
  "proxy-authentication-info"?: string;

  // security
  allow?: string; // to inform valid methods

  "strict-transport-security"?: string; // rfc6797: HTTP Strict Transport Security (HSTS)

  "content-security-policy"?: string; // w3 Content Security Policy Level 3
  "content-security-policy-report-only"?: string; // w3 Content Security Policy Level 3
  "report-to"?: string;

  "access-control-allow-origin"?: string; // w3 Fetch: response of CORS request
  "access-control-allow-credentials"?: string; // w3 Fetch: response of CORS request
  "access-control-allow-methods"?: string; // w3 Fetch: response of CORS request
  "access-control-allow-headers"?: string; // w3 Fetch: response of CORS request
  "access-control-max-age"?: string; // w3 Fetch: response of CORS request
  "access-control-expose-headers"?: string; // w3 Fetch: response of CORS request

  "cross-origin-embedder-policy"?: string; // w3 HTML: Cross-origin embedder policies
  "cross-origin-embedder-policy-report-only"?: string; // w3 HTML: Cross-origin embedder policies
  "cross-origin-opener-policy"?: string; // w3 HTML: Cross-origin opener policies
  "cross-origin-opener-policy-report-only"?: string; // w3 HTML: Cross-origin opener policies
  "cross-origin-resource-policy"?: string; // w3 Fetch: Cross-origin resource policies

  "origin-agent-cluster"?: string; // w3 HTML: Origin-keyed agent clusters
  "x-content-type-options"?: string; // w3 Fetch: `X-Content-Type-Options` header

  // other
  "set-cookie"?: string[]; // rfc6295: HTTP State Management Mechanism

  "sec-websocket-extensions"?: string; // rfc6455: The WebSocket Protocol
  "sec-websocket-accept"?: string; // rfc6455: The WebSocket Protocol
  "sec-websocket-protocol"?: string; // rfc6455: The WebSocket Protocol
  "sec-websocket-version"?: string; // rfc6455: The WebSocket Protocol

  "proxy-status"?: string; // rfc9209: The Proxy-Status HTTP Response Header Field
};

export interface Headers extends Iterable<[string, string]> {
  get(key: string): string;
  has(key: string): string;
}
export interface RequestHeaders extends Headers, PredefinedRequestHeaders {}

export interface ResponseHeaders extends Headers, PredefinedResponseHeaders {
  set(key: string, value: string): void;
}
