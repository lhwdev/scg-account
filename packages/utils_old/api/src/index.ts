import { MapToFrontendType } from "../../api-frontend/src/api/common";
import { InputParameters, Routes, RoutesRecord } from "./api";

export * from "./api";
export * from "./route";
export * from "./context";
export * from "./serialization";

export class HttpApi<
  R extends Routes<InputParameters, RoutesRecord<InputParameters>>,
> {
  constructor(public root: R) {}

  mockFrontend(): MapToFrontendType<R> {
    throw "TODO";
  }
}
