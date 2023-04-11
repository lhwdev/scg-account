import { EntityBuilder } from "./EntityBuilder";
import {
  InputFunction,
  InputContainerWrapper,
  InputContainer,
} from "./parameter";
import { Modify } from "../type";
import { InputParameters } from "../api/parameter";

export class Procedure<Input extends InputParameters = InputParameters>
  implements InputContainerWrapper<Input>
{
  constructor(public data: PrecedureData<Input>) {}

  input<const Child extends InputParameters>(
    handler: InputFunction<Child, Input>,
  ): Procedure<Modify<Input, Child>> {
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
