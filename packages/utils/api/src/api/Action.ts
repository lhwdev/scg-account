import { RouteInterface } from "../route";
import { InputContainerBuilder } from "../builder";
import { InputParameters, ResultParameters } from "./input";

export class Action<
  Input extends InputParameters = InputParameters,
  Result extends ResultParameters | undefined = ResultParameters | undefined,
> implements RouteInterface<Input>
{
  constructor(
    public name: string,
    public input: InputContainerBuilder<Input>,
    public result: Result,
  ) {}
}
