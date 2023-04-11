import { Nested } from "../../serialization";
import { LocatableParameter } from "./Parameter";

export type InputValue = Record<string, Nested<unknown>>;

export class InputValueContainer<T extends InputValue> {
  constructor(public rootValue: T /* , public container: */) {}

  get<T>(parameter: LocatableParameter<T>): T {
    return parameter.locateParameterValue(this.rootValue);
  }
}
