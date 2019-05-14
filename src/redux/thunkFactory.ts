/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
import { AsyncAction } from "./actionCreators";
import { ThunkResult, RootState } from "./storeTypes";

// thunk factory methods for when all you want to do is
// 1. dispatch as START action
// 2. perform some async action
// 3. then dispatch SUCCESS or ERROR

export function createThunkWithState<TResult, TArgs extends any[]>(
  action: AsyncAction,
  handleAction: (getState: () => RootState, ...args: TArgs) => Promise<TResult>
): (...args: TArgs) => ThunkResult<void> {
  return (...args) => (dispatch, getState) => {
    dispatch({ type: action.START });
    return handleAction(getState, ...args).then(
      result => dispatch({ type: action.SUCCESS, payload: result }),
      error => dispatch({ type: action.ERROR, payload: error })
    );
  };
}

export function createThunk<TResult, TArgs extends any[]>(
  action: AsyncAction,
  handleAction: (...args: TArgs) => Promise<TResult>
): (...args: TArgs) => ThunkResult<void> {
  return createThunkWithState(action, (getState, ...args) =>
    handleAction(...args)
  );
}
