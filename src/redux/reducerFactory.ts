/* eslint-disable no-case-declarations */
import { AnyAction } from "redux";

import { AsyncAction } from "./actionCreators";

export interface IndexedState<T extends { id: string }> {
  byId: { [id: string]: T };
  allIds: string[];
  loading: boolean;
  error?: string;
}

// Helper for indexed state to allow
// 1. adding single items to the indexed state
// 2. replacing the entire indexed state
// 3. removing item from the state
// I am deliberately *not* including 'edit'/'update' here
// as I believe that will encourage a leaning towards
// automatic 'crud' rather than recording the intention
// with more meaningful state updates
export function createReducerForIndexedState<
  TItem extends { id: string },
  TState extends IndexedState<TItem>
>(
  addAsyncAction: AsyncAction,
  replaceAllAsyncAction: AsyncAction,
  deleteAsyncAction: AsyncAction
) {
  return (state: TState, { type, payload }: AnyAction) => {
    switch (type) {
      case addAsyncAction.SUCCESS:
        return {
          ...state,
          loading: false,
          error: undefined,
          allIds: [...state.allIds, payload.id],
          byId: { ...state.byId, [payload.id]: payload }
        };

      case replaceAllAsyncAction.SUCCESS:
        const items = payload as TItem[];
        const indexedById = items.reduce((obj, row) => {
          return { ...obj, [row.id]: row };
        }, {});

        return {
          ...state,
          loading: false,
          error: undefined,
          allIds: items.map(item => item.id),
          byId: indexedById
        };

      case addAsyncAction.ERROR:
      case replaceAllAsyncAction.ERROR:
      case deleteAsyncAction.ERROR:
        return {
          ...state,
          loading: false,
          error: payload
        };

      case addAsyncAction.START:
      case replaceAllAsyncAction.START:
      case deleteAsyncAction.START:
        return {
          ...state,
          loading: true,
          error: undefined
        };

      case deleteAsyncAction.SUCCESS:
        const idToDelete = payload;
        const {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          [idToDelete]: _,
          ...remainingItemsById
        } = state.byId;

        return {
          ...state,
          loading: false,
          error: undefined,
          allIds: state.allIds.filter(id => id !== idToDelete),
          byId: remainingItemsById
        };

      default:
        return state;
    }
  };
}
