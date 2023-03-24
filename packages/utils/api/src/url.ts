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
type Hex =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f";

// unreserved := alpha[a-zA-Z] / digit[0-9] / "-" / "." / "_" / "~"
// pct-encoded := % hex hex
// sub-delim := "!" / "$" / "&" / "'" / "(" / ")" / "*" / "+" / "," / ";" / "="

type PathSegmentChar =
  | Alpha
  | "-"
  | "."
  | "_"
  | "~"
  | `%${Hex}${Hex}`
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
type StringToChars<T extends string> = string extends T
  ? string[]
  : T extends `${infer C0}${infer C1}${infer C2}${infer C3}${infer C4}${infer C5}${infer R}`
  ? [C0, C1, C2, C3, C4, C5, ...StringToChars<R>]
  : T extends `${infer C0}${infer C1}${infer C2}${infer C3}${infer R}`
  ? [C0, C1, C2, C3, ...StringToChars<R>]
  : T extends `${infer C0}${infer R}`
  ? [C0, ...StringToChars<R>]
  : [];

type PathSegment<T extends string> = StringToChars<T> extends PathSegmentChar[] ? void : never;


type Param<Segment extends string> = Segment extends `:${infer S}`
  ? { [segment in S]: string }
  : {};

function get<const Path extends string>(_path: Path, _handler: (param: Param<Path>) => void) {
  throw "TODO";
}

get("user", param => {
  param.nothingHere // param = {}
})

get(":user", param => {
  param.user // param = { user: string; }
})

get("invalid path segment", _param => { throw "TODO"; })


