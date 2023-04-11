import { Action } from "../api/Action";
import {
  InputContainer,
  InputParameters,
  ResultParameters,
} from "../api/parameter";
import { Modify } from "../type";
import {
  AnyInputFunction,
  InputFunction,
  InputFunctionTypes,
  createInputContainer,
} from "./parameter";
import { InputContainerWrapper } from "./parameter/InputContainerWrapper";

// builders

export class ActionBuilder<
  Input extends AnyInputFunction = AnyInputFunction,
  Result extends ResultParameters | undefined = ResultParameters | undefined,
> implements InputContainerWrapper<ReturnType<Input>>
{
  constructor(private data: ActionData<Input, Result>) {}

  input<const Child extends InputParameters>(
    handler: InputFunction<Modify<ReturnType<Input>, Child>, ReturnType<Input>>,
  ): ActionBuilder<
    InputFunction<Modify<ReturnType<Input>, Child>, ReturnType<Input>>,
    Result
  > {
    return new ActionBuilder({
      ...this.data,
      input: handler,
    });
  }

  build(
    name: string,
    parentInput: InputContainer<InputFunctionTypes<Input>["Previous"]>,
  ): Action<ReturnType<Input>, Result> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Action(
      name,
      createInputContainer(parentInput, this.data.input),
      this.data.result,
    );
  }
}

// types

type ActionData<
  Input extends AnyInputFunction,
  Result extends ResultParameters | undefined,
> = {
  input: Input;
  result: Result;
};
