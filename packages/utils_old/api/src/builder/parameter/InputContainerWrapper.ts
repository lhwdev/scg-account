import { InputParameters } from "../../api/parameter";
import { Modify } from "../../type";
import { InputFunction } from "./Function";

export interface InputContainerWrapper<Input extends InputParameters> {
  input<const Child extends InputParameters>(
    handler: InputFunction<Child, Input>,
  ): InputContainerWrapper<Modify<Input, Child>>;
}
