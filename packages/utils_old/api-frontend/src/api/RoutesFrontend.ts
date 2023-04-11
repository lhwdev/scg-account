import { InputParameters, Routes, RoutesRecord } from "@scg-utils/api";
import { MapToFrontendType as MapToFrontendType, apiSymbol } from "./common";

export type RoutesFrontend<
  Input extends InputParameters,
  T extends RoutesRecord<Input>,
> = {
  [apiSymbol]: Routes<Input, T>;
} & {
  [Name in keyof T]: MapToFrontendType<T[Name]>;
};
