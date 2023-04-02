import { Action, InputParameters, ResultParameters } from "@scg-utils/api";

export class ActionFrontend<
  Input extends InputParameters,
  Result extends ResultParameters,
> {
  constructor(public action: Action<Input, Result>) {}
}
