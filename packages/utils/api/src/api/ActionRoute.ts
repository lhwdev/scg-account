import { Action } from "./Action";
import { Route } from "../route";
import { InputContainer } from "../builder";
import { InputParameters } from "./parameter";

export class ActionRoute<
  A extends Action,
  Input extends InputParameters,
> extends Route<Input> {
  constructor(public action: A, input: InputContainer<Input>) {
    super(action.name, input);
  }
}
