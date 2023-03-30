import { RouteInterface } from "../route";
import { InputParameters, ResultParameters } from "../builder";

export class Action<
  Input extends InputParameters = InputParameters,
  Result extends ResultParameters | undefined = ResultParameters | undefined,
> implements RouteInterface<Input>
{
  constructor(
    public name: string,
    public input: Input,
    public result: Result,
  ) {}
}
