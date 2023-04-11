import { InputParameters } from ".";

export class InputContainer<
  Input extends InputParameters = InputParameters,
  Parent extends InputParameters = InputParameters,
> {
  constructor(public parent: InputContainer<Parent>, public value: Input) {}
}

export const EmptyInputContainer = new InputContainer(
  undefined as unknown as InputContainer,
  {},
);
// Note: there won't be any 'infinite traverse' problem
//       No programmer will write while(true) without any breaks or conditions.
//       They will find out how to escape, then come across this EmptyInputContainer.
//       It becomes more complex if parent may be null; TS will (maybe) have some issues with type inference. If you define Parent extends InputParameters | null then parent: Parent extends null ? null : InputContainer<Parent & InputParmeters>... headache
EmptyInputContainer.parent = EmptyInputContainer;
