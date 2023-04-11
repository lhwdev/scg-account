import {
  Action,
  ActionRoute,
  InputParameters,
  ResultParameters,
  ValueTypeOf,
} from "@scg-utils/api";
import { apiSymbol } from "./common";

export interface ActionRouteFrontend<
  Input extends InputParameters,
  A extends Action,
> {
  [apiSymbol]: ActionRoute<Input, A>;

  (input: ValueTypeOf<Input>): Promise<
    ValueTypeOf<
      A extends Action<InputParameters, infer R extends ResultParameters>
        ? R
        : never
    >
  >;
}
