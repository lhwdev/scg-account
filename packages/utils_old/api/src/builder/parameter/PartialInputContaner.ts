import { InputContainer, InputParameters } from "../../api";
import { Modify } from "../../type";
import {
  requestParameterProxyImpl,
  previousParameterProxyImpl,
} from "../proxy";
import { InputFunction } from "./Function";

export function createInputContainer<
  Parent extends InputParameters,
  Current extends InputParameters,
>(
  parent: InputContainer<Parent>,
  current: InputFunction<Current, Parent>,
): InputContainer<Modify<Parent, Current>, Parent> {
  return new InputContainer(parent, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(parent.value as any), // why it cause 'Spread types may only be created from object types'
    ...current(
      requestParameterProxyImpl,
      previousParameterProxyImpl(parent.value),
    ),
  });
}
