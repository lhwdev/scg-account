import {
  ParameterContext,
  RequestParameterContext,
  ResponseParameterContext,
} from "../context";
import { Nested } from "../serialization";

/// Parameters

const doNotImplementParameterByObjectLiteral = Symbol(
  "doNotImplementParameterByObject",
);

export abstract class Parameter<
  T = unknown,
  Context extends ParameterContext = ParameterContext,
> {
  abstract serialize(context: Context, data: T): Promise<void>;
  abstract deserialize(context: Context): Promise<T>;
}

export interface Parameter {
  [doNotImplementParameterByObjectLiteral]: true;
}

Parameter.prototype[doNotImplementParameterByObjectLiteral] = true;

export interface LocatableParameter<T = unknown> {
  locateParameterValue(value: InputValue): T;
}

export abstract class PhantomParameter<
  T = unknown,
  Context extends ParameterContext = ParameterContext,
> extends Parameter<T, Context> {
  async serialize(_context: Context, _data: T): Promise<void> {
    // do nothing
  }

  map<U>(mapper: (from: T) => U): PhantomParameter<U, Context> {
    const from = this;
    return new (class extends PhantomParameter<U, Context> {
      async deserialize(context: Context) {
        return mapper(await from.deserialize(context));
      }
    })();
  }

  validate(
    validater: (value: T, context: Context) => void,
  ): PhantomParameter<T, Context> {
    const from = this;
    return new (class extends PhantomParameter<T, Context> {
      async deserialize(context: Context) {
        const value = await from.deserialize(context);
        validater(value, context);
        return value;
      }
    })();
  }
}

export type InputParameters = Record<
  string,
  Nested<Parameter<unknown, RequestParameterContext>>
>;

export type ResultParameters = Nested<
  Parameter<unknown, ResponseParameterContext>
>;

/// InputContainer

export type InputValue = Record<string, Nested<unknown>>;

export class InputValueContainer<T extends InputValue> {
  constructor(public rootValue: T /* , public container: */) {}

  get<T>(parameter: LocatableParameter<T>): T {
    return parameter.locateParameterValue(this.rootValue);
  }
}
