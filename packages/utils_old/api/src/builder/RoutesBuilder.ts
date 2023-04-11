import { Routes } from "../api/Routes";
import { InputParameters } from "../api/parameter";
import { Modify } from "../type";
import { ActionBuilder } from "./ActionBuilder";
import { EntityBuilder } from "./EntityBuilder";
import { InputFunction } from "./parameter";
import { InputContainerWrapper } from "./parameter/InputContainerWrapper";

export type BuilderRoute<Input extends InputParameters> =
  | RoutesBuilder<Input, BuilderRoutesRecord>
  | EntityBuilder<Input>
  | ActionBuilder<InputFunction<Input, Input>>;

export type BuilderRoutesRecord<
  ParentInput extends InputParameters = InputParameters,
> = { [key: string]: BuilderRoute<ParentInput> };

export class RoutesBuilder<
  Input extends InputParameters,
  T extends BuilderRoutesRecord<Input>,
> implements InputContainerWrapper<Input>
{
  constructor(public data: RoutesData<Input, T>) {}

  input<const Child extends InputParameters>(
    handler: InputFunction<Child, Input>,
  ): RoutesBuilder<Modify<Input, Child>, T> {
    return new RoutesBuilder({
      ...this.data,
      input: handler,
    });
  }

  build(
    name: string,
  ): Routes<
    InputParameters,
    { [Route in keyof T]: ReturnType<T[Route]["build"]> }
  > {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items: any = {};
    for (const [key, value] of Object.entries(this.data.items)) {
      items[key] = value.build(key);
    }
    return new Routes(name, this.data.input, items);
  }
}

type RoutesData<
  Input extends InputParameters,
  Items extends BuilderRoutesRecord,
> = {
  input: InputFunction<Input>;
  items: Items;
};
