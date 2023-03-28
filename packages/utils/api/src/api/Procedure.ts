import { EntityBuilder } from "../builder/EntityBuilder";
import {
  InputParameters,
  InputFunction,
  InputContainer,
} from "../builder/input";

export class Procedure<Input extends InputParameters = {}>
  implements InputContainer<Input>
{
  constructor(public inputHandler: InputFunction<Input>) {}

  input<const Result extends InputParameters>(
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
