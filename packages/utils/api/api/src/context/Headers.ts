// MDN 문서를 보고 손수 깎은 타입(사실 타입을 최대한 좁히고 싶었지만 "GET, POST" 같은 식의 string의 타입 검사하기가 좀...)
type PredefinedHeaders = {
  // basic HTTP & connection
  host?: string;
  origin?: string;
  referer?: string;
  "user-agent"?: string;
  server?: string;

  via?: string;
  "server-timing"?: string;

  cookie?: string[];
  "set-cookie"?: string[];
  location?: string;
  "max-forward"?: string;

  trailer?: string;
  connection?: string;
  upgrade?: string;
  "keep-alive"?: string;
  "retry-after"?: string;
  te?: string; // informally accept-transfer-encoding
  "transfer-encoding"?: string;

  // content
  "content-disposition"?: string;
  "content-encoding"?: string;
  "content-language"?: string;
  "content-length"?: string;
  "content-location"?: string;
  "content-range"?: string;
  "content-security-policy"?: string;
  "content-security-policy-report-only"?: string;
  "content-type"?: string;
  digest?: string;
  etag?: string;
  vary?: string;

  link?: string;

  // authorization
  authorization?: string;
  "www-authentication"?: string;
  "proxy-authorization"?: string;
  "proxy-authenticate"?: string;

  // lifecycle and caching
  date?: string;
  age?: string;
  "last-modified"?: string;
  expires?: string;
  "cache-control"?: string;
  "clear-site-data"?: string;

  // content negotiation & request
  accept?: string;
  "accept-ch"?: string;
  "accept-encoding"?: string;
  "accept-language"?: string;
  "accept-patch"?: string;
  "accept-post"?: string;
  "accept-ranges"?: string;
  range?: string;
  "want-digest"?: string;

  expect?: string;
  "if-match"?: string;
  "if-none-match"?: string;
  "if-modified-since"?: string;
  "if-unmodified-since"?: string;
  "if-range"?: string;

  // security & cors
  allow?: string;
  "timing-allow-origin"?: string;
  "permissions-policy"?: string;
  "referrer-policy"?: string;
  "strict-transport-security"?: string;
  "x-frame-options"?: string;

  "access-control-allow-credentials"?: string;
  "access-control-allow-headers"?: string;
  "access-control-allow-methods"?: string;
  "access-control-allow-origin"?: string;
  "access-control-expose-headers"?: string;
  "access-control-max-age"?: string;
  "access-control-request-headers"?: string;
  "access-control-request-method"?: string;

  "cross-origin-embedder-policy"?: string;
  "cross-origin-opener-policy"?: string;
  "cross-origin-resource-policy"?: string;

  // others
  "alt-svc"?: string;
  forwarded?: string;
  from?: string;
  sourcemap?: string;
};

export type IncomingHeaders = PredefinedHeaders & {
  [UnknownKey in Exclude<Lowercase<string>, keyof PredefinedHeaders>]?:
    | string
    | undefined;
};
