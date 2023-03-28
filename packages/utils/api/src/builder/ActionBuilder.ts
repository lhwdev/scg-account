import { Action } from "../api/Action";
import {
  InputParameters,
  InputFunction,
  InputContainer,
  ResultParameters,
} from "./input";
import { requestProxyImpl } from "./proxy";

// builders

export class ActionBuilder<
  Input extends InputParameters,
  Result extends ResultParameters | undefined,
> implements InputContainer<Input>
{
  constructor(private data: ActionData<Input, Result>) {}

  input<const Input2 extends InputParameters>(
    handler: InputFunction<Input2>,
  ): ActionBuilder<Input & Input2, Result> {
    return new ActionBuilder({
      ...this.data,
      inputParameters: {
        ...this.data.inputParameters,
        ...handler(requestProxyImpl),
      },
    });
  }

  build(name: string): Action<Input, Result> {
    return new Action(name, this.data.inputParameters, this.data.result);
  }
}

// types

type ActionData<
  Input extends InputParameters,
  Result extends ResultParameters | undefined,
> = {
  inputParameters: Input;
  result: Result;
};
