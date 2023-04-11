/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  Action,
  ActionRoute,
  Entity,
  EntityActions,
  InputParameters,
  Route,
  Routes,
  RoutesRecord,
} from "@scg-utils/api";
import type { RoutesFrontend } from "./RoutesFrontend";
import type { ActionRouteFrontend } from "./ActionRouteFrontend";
import { EntityFrontend } from "./EntityFrontend";

export const apiSymbol = Symbol("api");

export type MapToFrontendType<R extends Route<InputParameters>> =
  R extends Routes<
    infer Input extends InputParameters,
    any // why ts does not support something like A<infer B, infer C extends D<B>> ?
  >
    ? R extends Routes<any, infer T extends RoutesRecord<any>> // TODO: any
      ? RoutesFrontend<Input, T>
      : never
    : R extends ActionRoute<
        infer Input extends InputParameters,
        infer A extends Action
      >
    ? ActionRouteFrontend<Input, A>
    : R extends Entity<
        infer Input extends InputParameters,
        infer Actions extends EntityActions
      >
    ? EntityFrontend<Input, Actions>
    : never;
