import { EntityBuilder } from "../builder/EntityBuilder";
import { InputType, InputFunction, InputContainer } from "../builder/input";

export class Procedure<Input extends InputType = {}>
  implements InputContainer<Input>
{
  constructor(public inputHandler: InputFunction<Input>) {}

  input<const Result extends InputType>(
    handler: InputFunction<Result>,
  ): Procedure<Input & Result> {
    const previous = this.inputHandler;
    return new Procedure(request => ({
      ...previous(request),
      ...handler(request),
    }));
  }

  entity(): EntityBuilder<{}, Input> {
    return new EntityBuilder({ inputHandler: this.inputHandler, actions: {} });
  }
}
