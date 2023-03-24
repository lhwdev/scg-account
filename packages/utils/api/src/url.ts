// 살려줘....

type LowercaseAlpha =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";
type UppercaseAlpha = Uppercase<LowercaseAlpha>;
type Alpha = LowercaseAlpha | UppercaseAlpha;

// unreserved := alpha[a-zA-Z] / digit[0-9] / "-" / "." / "_" / "~"
// pct-encoded := % hex hex
// sub-delim := "!" / "$" / "&" / "'" / "(" / ")" / "*" / "+" / "," / ";" / "="

export type PathSegmentChar =
  | Alpha
  | "-"
  | "."
  | "_"
  | "~"
  // | `%${Hex}${Hex}` // allowed by spec, but I cannot afford
  | "!"
  | "$"
  | "&"
  | "'"
  | "("
  | ")"
  | "*"
  | "+"
  | ","
  | ";"
  | "=";

// 복붙!
type StringToChars<T extends string> = string extends T
  ? string[]
  : T extends `${infer C0}${infer C1}${infer C2}${infer C3}${infer C4}${infer C5}${infer R}`
  ? [C0, C1, C2, C3, C4, C5, ...StringToChars<R>]
  : T extends `${infer C0}${infer C1}${infer C2}${infer C3}${infer R}`
  ? [C0, C1, C2, C3, ...StringToChars<R>]
  : T extends `${infer C0}${infer R}`
  ? [C0, ...StringToChars<R>]
  : [];

export type RouteTypeForSegment<
  Segment extends string,
  T,
  Allowed = never,
> = Segment extends Allowed
  ? T
  : StringToChars<Segment> extends PathSegmentChar[]
  ? T
  : never;
// type PathSegmentReturn<
//   Segment extends string,
//   R,
// > = StringToChars<Segment> extends
//   | PathSegmentChar[]
//   | [":", ...PathSegmentChar[]]
//   ? R
//   : never;

// type Param<Segment extends string> = Segment extends `:${infer S}`
//   ? { [segment in S]: string }
//   : {};

// interface RouteHandler<Segment extends string> {
//   get(handler: (param: Param<Segment>) => void): void;
// }

// function route<const Path extends string>(
//   _path: Path,
// ): PathSegmentReturn<Path, RouteHandler<Path>> {
//   throw "todo";
// }

// route("user").get(param => {
//   // param: {}
//   param.nothingHere; // Property 'nothingHere' does not exist...
// });

// route(":user").get(param => {
//   param.user;
// });

// // Property 'get' does not exist on type 'never'.
// route("illegal path").get(param => {});
