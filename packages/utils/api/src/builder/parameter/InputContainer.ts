import { InputParameters } from "../../api/parameter";
import { Modify } from "../../type";
import {
  requestParameterProxyImpl,
  previousParameterProxyImpl,
} from "../proxy";
import { InputFunction } from "./Function";

export class InputContainer<
  Input extends InputParameters = InputParameters,
  Parent extends InputParameters = InputParameters,
> {
  constructor(public parent: InputContainer<Parent>, public value: Input) {}

  withInput<const Input2 extends InputParameters>(
    handler: InputFunction<Input2, Input>,
  ): InputContainer<Modify<Input, Input2>, Input> {
    // tiny optimization
    const input2: Input2 =
      handler.length === 1
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (handler as any)(requestParameterProxyImpl)
        : handler(
            requestParameterProxyImpl,
            previousParameterProxyImpl(this.value),
          );

    return new InputContainer(this, {
      ...this.value,
      ...input2,
    });
  }
}

export const EmptyInputContainer = new InputContainer(
  undefined as unknown as InputContainer,
  {},
);
EmptyInputContainer.parent = EmptyInputContainer;

export interface InputContainerWrapper<Input extends InputParameters> {
  input<const Input2 extends InputParameters>(
    handler: InputFunction<Input2, Input>,
  ): InputContainerWrapper<Modify<Input, Input2>>;
}
