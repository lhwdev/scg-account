import { Action, Entity, EntityActions, InputParameters } from "@scg-utils/api";
import { apiSymbol } from "./common";
import { MapToActionFrontendType } from "./ActionFrontend";

export type EntityFrontend<
  Input extends InputParameters,
  Actions extends EntityActions,
> = {
  [apiSymbol]: Entity<Input, Actions>;
} & {
  [Key in keyof Actions]: MapToActionFrontendType<Actions[Key] & Action>;
};
