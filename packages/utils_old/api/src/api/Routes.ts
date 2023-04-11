import { InputContainer } from "../builder";
import { Route } from "../route";
import { InputParameters } from "./parameter";

export type RoutesRecord<Input extends InputParameters = InputParameters> =
  Record<string, Route<Input>>;

export class Routes<
  Input extends InputParameters,
  T extends RoutesRecord<Input>,
> extends Route<Input> {
  parent: Routes<InputParameters, RoutesRecord> | undefined;

  constructor(name: string, input: InputContainer<Input>, public items: T) {
    super(name, input);
  }
}
