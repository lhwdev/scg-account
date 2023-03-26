import { InputType, InputFunction, InputContainer } from "./input";

// builders

export class EntityBuilder<
  Actions extends EntityActions<Input>,
  Input extends InputType = {},
> implements InputContainer<Input>
{
  constructor(private data: EntityData<Actions, Input>) {}

  input<const Result extends InputType>(
    handler: InputFunction<Result>,
  ): EntityBuilder<Actions, Input & Result> {
    const previous = this.data.inputHandler;
    return new EntityBuilder({
      ...this.data,
      inputHandler: request => ({
        ...previous(request),
        ...handler(request),
      }),
    });
  }

  action(type: ActionType);
}

type ActionParams = [];

// types

export type ActionType =
  | "GET"
  | "HEAD "
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "PATCH";

type EntityActions<Input extends InputType> = {
  [Type in ActionType]?: EntityAction<Input, Type>;
};

type EntityAction<Input extends InputType, Type> = any;

type EntityData<
  Actions extends EntityActions<Input>,
  Input extends InputType,
> = {
  inputHandler: InputFunction<Input>;
  actions: Actions;
};
