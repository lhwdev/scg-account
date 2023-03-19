import { Api, ApiCommon, ApiEntity, ApiLibrary, ApiManager, Path } from "./type";

type Builder<Manager extends ApiManager> = (scope: BuildScope<Manager>) => void;

export class BuildScope<Manager extends ApiManager> {
  
}
