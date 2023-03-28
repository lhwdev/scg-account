import { RouteInterface } from "..";
import { InputParameters, ResultParameter } from "../builder";

export class Action<
  Input extends InputParameters = {},
  Result extends ResultParameter | undefined = undefined,
> implements RouteInterface<Input>
{
  constructor(
    public name: string,
    public input: Input,
    public result: Result,
  ) {}
}
