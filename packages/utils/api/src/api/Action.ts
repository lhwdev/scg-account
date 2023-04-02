import { RouteInterface } from "../route";
import { InputContainer } from "../builder";
import { InputParameters, ResultParameters } from "./parameter";

export class Action<
  Input extends InputParameters = InputParameters,
  Result extends ResultParameters | undefined = ResultParameters | undefined,
> implements RouteInterface<Input>
{
  constructor(
    public name: string,
    public input: InputContainer<Input>,
    public result: Result,
  ) {}
}
