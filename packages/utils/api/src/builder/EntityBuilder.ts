import { InputHandler, ResultHandler } from "..";
import { Action } from "../api";
import { ActionBuilder } from "./ActionBuilder";
import {
  InputParameters,
  InputFunction,
  InputContainer,
  ResultParameters,
} from "./input";
import { requestProxyImpl, responseProxyImpl } from "./proxy";

// builders

export class EntityBuilder<
  Input extends InputParameters = {},
  Actions extends EntityActions = {},
> implements InputContainer<Input>
{
  constructor(private data: EntityData<Input, Actions>) {}

  input<const Input2 extends InputParameters>(
    handler: InputFunction<Input2>,
  ): EntityBuilder<Input & Input2, Actions> {
    return new EntityBuilder({
      ...this.data,
      inputParameters: {
        ...this.data.inputParameters,
        ...handler(requestProxyImpl),
      },
    });
  }

  action<
    const Params extends ActionParams<Input2, Result>,
    const Input2 extends InputParameters,
    const Result extends ResultHandler | undefined,
  >(
    type: ActionType,
    params: Params,
  ): EntityBuilder<Input, Actions & Action<Input & Input2, Result>> {
    const builder = new ActionBuilder({
      inputParameters: {
        ...this.data.inputParameters,
        ...(params.input ?? {}),
      },
      result: params.result(responseProxyImpl),
    });
  }
}

type ActionParams<
  Input extends InputParameters | undefined,
  Result extends ResultHandler | undefined,
> = {
  input: Input extends undefined ? undefined : InputHandler<Input>;
  result?: Result;
};

// types

export type ActionType =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "PATCH";

type EntityActions = {
  [Type in ActionType]?: EntityAction<InputParameters, Type>;
};

interface EntityAction<Input extends InputParameters, Type> {
  type: Type;
  action: Action<Input>;
}

type EntityData<
  Input extends InputParameters,
  Actions extends EntityActions,
> = {
  inputParameters: Input;
  actions: Actions;
};
