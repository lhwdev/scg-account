import { Routes } from "../api/Routes";
import { InputParameters } from "../api/input";
import { Modify } from "../type";
import { ActionBuilder } from "./ActionBuilder";
import { EntityBuilder } from "./EntityBuilder";
import {
  InputContainerBuilder,
  InputContainerWrapper,
  InputFunction,
} from "./input";

export type BuilderRoute =
  | RoutesBuilder<InputParameters, BuilderRoutesRecord>
  | EntityBuilder
  | ActionBuilder;

export type BuilderRoutesRecord = { [key: string]: BuilderRoute };

export class RoutesBuilder<
  Input extends InputParameters,
  T extends BuilderRoutesRecord,
> implements InputContainerWrapper<Input>
{
  constructor(public data: RoutesData<Input, T>) {}

  input<const Input2 extends InputParameters>(
    handler: InputFunction<Input2, Input>,
  ): RoutesBuilder<Modify<Input, Input2>, T> {
    return new RoutesBuilder({
      ...this.data,
      input: this.data.input.withInput(handler),
    });
  }

  build(
    name: string,
  ): Routes<{ [Route in keyof T]: ReturnType<T[Route]["build"]> }> {
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
  input: InputContainerBuilder<Input>;
  items: Items;
};
