import { EntityBuilder } from "../builder/EntityBuilder";
import {
  InputFunction,
  InputContainerWrapper,
  InputContainer,
} from "../builder/input";
import { Modify } from "../type";
import { InputParameters } from "./input";

export class Procedure<Input extends InputParameters = InputParameters>
  implements InputContainerWrapper<Input>
{
  constructor(public data: PrecedureData<Input>) {}

  input<const Input2 extends InputParameters>(
    handler: InputFunction<Input2>,
  ): Procedure<Modify<Input, Input2>> {
    return new Procedure({
      ...this.data,
      input: this.data.input.withInput(handler),
    });
  }

  entity(): EntityBuilder<Input, {}> {
    return new EntityBuilder({
      input: this.data.input,
      actions: {},
    });
  }
}

interface PrecedureData<Input extends InputParameters> {
  input: InputContainer<Input>;
}
