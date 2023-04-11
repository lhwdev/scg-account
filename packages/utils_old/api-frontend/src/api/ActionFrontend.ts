import {
  Action,
  InputParameters,
  ResultParameters,
  ValueTypeOf,
} from "@scg-utils/api";
import { apiSymbol } from "./common";

export interface ActionFrontend<
  Input extends InputParameters,
  Result extends ResultParameters | undefined,
> {
  [apiSymbol]: Action<Input, Result>;

  (input: ValueTypeOf<Input>): Promise<
    Result extends undefined
      ? undefined
      : ValueTypeOf<Result & ResultParameters>
  >;
}

export type MapToActionFrontendType<A extends Action> = A extends Action<
  infer Input extends InputParameters,
  infer Result extends ResultParameters | undefined
>
  ? ActionFrontend<Input, Result>
  : never;
