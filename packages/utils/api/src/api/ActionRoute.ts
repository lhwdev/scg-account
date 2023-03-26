import { Action } from "./Action";
import { Route } from "..";

export class ActionRoute<A extends Action, Input = {}> extends Route<Input> {
  constructor(public action: A, input: Input) {
    super(action.name, input);
  }
}
