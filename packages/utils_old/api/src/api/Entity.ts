import { InputContainer } from "../builder";
import { ActionType, Route } from "../route";
import { Action } from "./Action";
import { Routes, RoutesRecord } from "./Routes";
import { InputParameters } from "./parameter";

export class Entity<
  Input extends InputParameters,
  Actions extends EntityActions,
> extends Route<Input> {
  parent: Routes<InputParameters, RoutesRecord> | undefined;

  constructor(
    name: string,
    input: InputContainer<Input>,
    public actions: Actions,
  ) {
    super(name, input);
  }
}

export type EntityActions = {
  // no input here
  [Type in ActionType]?: Action;
};
