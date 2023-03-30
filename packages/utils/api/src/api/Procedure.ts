import { EntityBuilder } from "../builder/EntityBuilder";
import {
  InputParameters,
  InputFunction,
  InputContainerWrapper,
} from "../builder/input";
import { requestProxyImpl } from "../builder/proxy";
import { Modify } from "../type";

export class Procedure<Input extends InputParameters = {}>
  implements InputContainerWrapper<Input>
{
  constructor(public inputParameters: Input) {}

  input<const Input2 extends InputParameters>(
    handler: InputFunction<Input2>,
  ): Procedure<Modify<Input, Input2>> {
    const previous = this.inputParameters;
    return new Procedure({
      ...previous,
      ...handler(requestProxyImpl),
    });
  }

  entity(): EntityBuilder<Input, {}> {
    return new EntityBuilder({
      inputParameters: this.inputParameters,
      actions: {},
    });
  }
}
