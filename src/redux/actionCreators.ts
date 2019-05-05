/* eslint-disable import/prefer-default-export */

// don't try and do anything 'clever' for creating the action
// names themselves. Anything other than a literal assignment
// will break any typescript clever-ness
// see https://github.com/piotrwitek/typesafe-actions#constants
export type TypeConstant = string;

export function createAsyncAction<
  T1 extends TypeConstant,
  T2 extends TypeConstant,
  T3 extends TypeConstant
>(start: T1, success: T2, error: T3) {
  return {
    START: start,
    SUCCESS: success,
    ERROR: error
  };
}
