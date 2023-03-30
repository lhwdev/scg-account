import { Action } from "./Action";
import { Route } from "../route";
import { InputParameters } from "../builder";

export class ActionRoute<
  A extends Action,
  Input extends InputParameters,
> extends Route<Input> {
  constructor(public action: A, input: Input) {
    super(action.name, input);
  }
}
