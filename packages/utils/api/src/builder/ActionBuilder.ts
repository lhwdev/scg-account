import { Action } from "../api/Action";
import { InputParameters, ResultParameters } from "../api/parameter";
import { Modify } from "../type";
import {
  InputFunction,
  InputContainerWrapper,
  InputContainer,
} from "./parameter";

// builders

export class ActionBuilder<
  Input extends InputParameters = InputParameters,
  Result extends ResultParameters | undefined = ResultParameters | undefined,
> implements InputContainerWrapper<Input>
{
  constructor(private data: ActionData<Input, Result>) {}

  input<const Input2 extends InputParameters>(
    handler: InputFunction<Input2, Input>,
  ): ActionBuilder<Modify<Input, Input2>, Result> {
    return new ActionBuilder({
      ...this.data,
      input: this.data.input.withInput(handler),
    });
  }

  build(name: string): Action<Input, Result> {
    return new Action(name, this.data.input, this.data.result);
  }
}

// types

type ActionData<
  Input extends InputParameters,
  Result extends ResultParameters | undefined,
> = {
  input: InputContainer<Input>;
  result: Result;
};
