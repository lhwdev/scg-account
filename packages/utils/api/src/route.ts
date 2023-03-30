import { Routes, RoutesRecord } from "./api/Routes";
import { InputParameters } from "./builder";

export interface RouteInterface<Input extends InputParameters> {
  name: string;
  input: Input;
}

export class Route<Input extends InputParameters>
  implements RouteInterface<Input>
{
  parent?: Routes<RoutesRecord>;

  constructor(public name: string, public input: Input) {}
}

export const actionTypes = [
  "GET",
  "HEAD",
  "POST",
  "PUT",
  "DELETE",
  "CONNECT",
  "OPTIONS",
  "TRACE",
  "PATCH",
] as const;

export type ActionType = Lowercase<(typeof actionTypes)[number]>;
