import { Action, Entity, EntityActions } from "../api";
import { ActionType, actionTypes } from "../route";
import { Modify } from "../type";
import { ActionBuilder } from "./ActionBuilder";
import {
  InputParameters,
  InputFunction,
  InputContainerWrapper,
  ResultFunction,
} from "./input";
import { requestProxyImpl, responseProxyImpl } from "./proxy";

// builders

export class EntityBuilder<
  Input extends InputParameters = InputParameters,
  Actions extends EntityActions = EntityActions,
> implements InputContainerWrapper<Input>
{
  constructor(private data: EntityData<Input, Actions>) {}

  input<const Input2 extends InputParameters>(
    handler: InputFunction<Input2>,
  ): EntityBuilder<Modify<Input, Input2>, Actions> {
    return new EntityBuilder({
      ...this.data,
      inputParameters: {
        ...this.data.inputParameters,
        ...handler(requestProxyImpl),
      },
    });
  }

  action<
    const Type extends ActionType,
    const Params extends ActionParams<Input2Fn, ResultFn>,
    const Input2Fn extends InputFunction | undefined,
    const ResultFn extends ResultFunction | undefined,
  >(
    type: Type,
    params: Params,
  ): EntityBuilder<
    Input,
    Modify<
      Actions,
      Record<Type, Action<Input & ResultOf<Input2Fn>, ResultOf<ResultFn>>>
    >
  > {
    const builder = new ActionBuilder({
      inputParameters: {
        ...this.data.inputParameters,
        ...("input" in params ? params.input ?? {} : {}),
      },
      result:
        "result" in params
          ? params.result === undefined
            ? undefined
            : params.result(responseProxyImpl)
          : undefined,
    });
    return new EntityBuilder({
      ...this.data,
      actions: {
        ...this.data.actions,
        [type]: { type, action: builder.build(type) },
      } as unknown as Modify<
        Actions,
        Record<Type, Action<Input & ResultOf<Input2Fn>, ResultOf<ResultFn>>>
      >, // TODO
    });
  }

  build(name: string): Entity<Input, Actions> {
    return new Entity(name, this.data.inputParameters, this.data.actions);
  }
}

type ActionContainer<
  Input extends InputParameters = InputParameters,
  Actions extends EntityActions = EntityActions,
> = {
  [Type in ActionType]: <
    const Params extends ActionParams<Input2Fn, ResultFn>,
    const Input2Fn extends InputFunction | undefined,
    const ResultFn extends ResultFunction | undefined,
  >(
    params: Params,
  ) => EntityBuilder<
    Input,
    Modify<
      Actions,
      { get: Action<Input & ResultOf<Input2Fn>, ResultOf<ResultFn>> }
    >
  >;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EntityBuilder extends ActionContainer {}

for (const type of actionTypes) {
  const lowerType = type.toLowerCase() as Lowercase<typeof type>;
  // 타입? 포기하면 편해....
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (EntityBuilder.prototype as any)[lowerType] = function (
    this: EntityBuilder,
    params,
  ) {
    return this.action(lowerType, params);
  } satisfies ActionContainer[typeof lowerType];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ResultOf<T extends undefined | ((...args: any) => any)> = T extends (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any
) => infer R
  ? R
  : undefined;

type ActionParams<
  InputFn extends InputFunction | undefined,
  ResultFn extends ResultFunction | undefined,
> = (InputFn extends undefined ? {} : { input: InputFn }) &
  (ResultFn extends undefined ? {} : { result: ResultFn });

type EntityData<
  Input extends InputParameters,
  Actions extends EntityActions,
> = {
  inputParameters: Input;
  actions: Actions;
};
