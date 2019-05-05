// https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/
interface Flavoring<FlavorT> {
  _type?: FlavorT;
}

// eslint-disable-next-line import/prefer-default-export
export type Flavor<T, FlavorT> = T & Flavoring<FlavorT>;
