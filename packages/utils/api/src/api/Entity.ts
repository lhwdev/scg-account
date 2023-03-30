import { InputParameters } from "../builder";
import { ActionType, Route } from "../route";
import { Action } from "./Action";
import { Routes, RoutesRecord } from "./Routes";

export class Entity<
  Input extends InputParameters,
  Actions extends EntityActions,
> extends Route<Input> {
  parent: Routes<RoutesRecord> | undefined;

  constructor(name: string, input: Input, public actions: Actions) {
    super(name, input);
  }
}

export type EntityActions = {
  // no input here
  [Type in ActionType]?: Action;
};
