import { Api, ApiCommon, ApiEntity, ApiLibrary, ApiManager, Path } from "./type";

type Builder<Manager extends ApiManager> = (scope: BuildScope<Manager>) => void;

export class BuildScope<Manager extends ApiManager> {
  private apis = new Map<Path, Api<Manager>>();
  private extras: ApiCommon<Manager> = {
    metadata: {},
  };

  library(name: Path, block: Builder<Manager>) {
    const scope = new BuildScope<Manager>();
    block(scope);
    this.apis.set(name, scope.build());
  }

  entity(name: Path, value: ApiEntity<Manager>) {
    this.apis.set(name, value);
  }

  build(): ApiLibrary<Manager> {
    return { ...Object.fromEntries(this.apis), metadata: this.extras };
  }
}

export function buildApi<Manager extends ApiManager>(block: Builder<Manager>): ApiLibrary<Manager> {
  const scope = new BuildScope<Manager>();
  block(scope);
  return scope.build();
}
