import { ActionResultHandler, RouteInterface } from "..";

export class Action<
  Result extends ActionResultHandler = ActionResultHandler,
  Input = {},
> implements RouteInterface<Input>
{
  constructor(
    public name: string,
    public input: Input,
    public result: Result,
  ) {}
}
