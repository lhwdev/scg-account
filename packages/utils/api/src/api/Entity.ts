import { EntityActions, Route, Routes, RoutesRecord } from "..";

export class Entity<
  Actions extends EntityActions<Input>,
  Input = {},
> extends Route<Input> {
  parent: Routes<RoutesRecord> | undefined;

  constructor(name: string, input: Input, public actions: Actions) {
    super(name, input);
  }
}
