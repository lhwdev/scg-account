import { Action } from "../api/Action";
import { InputType, InputFunction, InputContainer } from "./input";

// builders

export class ActionBuilder<Input extends InputType>
  implements InputContainer<Input>
{
  constructor(private data: ActionData<Input>) {}

  input<const ResultParameters extends InputType>(
    handler: InputFunction<ResultParameters>,
  ): InputContainer<Input & ResultParameters> {
    const previous = this.data.inputHandler;
    return new ActionBuilder({
      ...this.data,
      inputHandler: request => ({
        ...previous(request),
        ...handler(request),
      }),
    });
  }

  build(): Action;
}

// types

type ActionData<Input extends InputType> = {
  inputHandler: InputFunction<Input>;
};
