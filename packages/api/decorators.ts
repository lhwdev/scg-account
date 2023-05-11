// function decoratorOrDefault<Option>(decorator)

const apiMetadataSymbol = Symbol("utils:apiMetadata");

class ApiMetadata {
  properties: ApiProperty[] = [];
}

interface ApiProperty {
  name: string;
}

function apiMetadataOf(value: {}): ApiMetadata {
  if (apiMetadataSymbol in value) {
    return value[apiMetadataSymbol] as ApiMetadata;
  } else {
    const metadata = new ApiMetadata();
    (value as any)[apiMetadataSymbol] = metadata;
    return metadata;
  }
}

function apiMetadataOfOrNull(value: {}): ApiMetadata | null {
  return (value as any)[apiMetadataSymbol] ?? null;
}

function property<This extends {}, Value>(
  _value: undefined,
  context: ClassFieldDecoratorContext<This, Value>,
): (initialValue: Value) => Value {
  return initialValue => initialValue;
}

class Test {
  @property
  hoi = 123;
}
