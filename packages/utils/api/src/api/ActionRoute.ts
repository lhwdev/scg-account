import { Action } from "./Action";
import { Route } from "../route";
import { InputContainer } from "../builder";
import { InputParameters } from "./parameter";

export class ActionRoute<
  Input extends InputParameters,
  A extends Action,
> extends Route<Input> {
  constructor(input: InputContainer<Input>, public action: A) {
    super(action.name, input);
  }
}
