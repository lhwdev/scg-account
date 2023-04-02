import { InputContainer } from "../builder";
import { Route } from "../route";
import { InputParameters } from "./input";

export type RoutesRecord<Input extends InputParameters = InputParameters> =
  Record<string, Route<Input>>;

export class Routes<
  T extends RoutesRecord<Input>,
  Input extends InputParameters = InputParameters,
> extends Route<Input> {
  parent: Routes<RoutesRecord> | undefined;

  constructor(name: string, input: InputContainer<Input>, public items: T) {
    super(name, input);
  }
}
