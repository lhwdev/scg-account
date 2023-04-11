export type Modify<T, R> = Omit<T, keyof R> & R;

export interface TypeFunction {
  argument: unknown;
  return: unknown;
}

export type Call<Fn extends TypeFunction, T> = (Fn & { argument: T })["return"];
