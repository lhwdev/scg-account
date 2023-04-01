import { Action } from "./Action";
import { Route } from "../route";
import { InputContainerBuilder } from "../builder";
import { InputParameters } from "./input";

export class ActionRoute<
  A extends Action,
  Input extends InputParameters,
> extends Route<Input> {
  constructor(public action: A, input: InputContainerBuilder<Input>) {
    super(action.name, input);
  }
}
