/* eslint-disable no-case-declarations */
import { AnyAction } from "redux";

import { createReducerForIndexedState } from "redux/reducerFactory";
import { RootState, CategoriesState } from "redux/storeTypes";

import {
  CATEGORY_DELETE,
  CATEGORY_LIST,
  CATEGORY_EDIT,
  CATEGORY_ADD
} from "./actions";
import { Category } from "./api";

export function getCategoryFromState(
  { categories }: RootState,
  categoryId: string
) {
  return {
    loading: categories.loading,
    error: categories.error,
    data: categories.byId[categoryId]
  };
}

export function getAllCategoriesFromState({ categories }: RootState) {
  return {
    loading: categories.loading,
    error: categories.error,
    data: categories.allIds.map(id => categories.byId[id])
  };
}

const categoriesIndexedStateReducer = createReducerForIndexedState<
  Category,
  CategoriesState
>(CATEGORY_LIST, CATEGORY_ADD, CATEGORY_DELETE);

export default function categories(
  state: CategoriesState = {
    byId: {},
    allIds: [],
    loading: false,
    error: undefined
  },
  action: AnyAction
) {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_EDIT.START:
      return { ...state, loading: true };

    case CATEGORY_EDIT.ERROR:
      return { ...state, loading: false, error: payload };

    case CATEGORY_EDIT.SUCCESS:
      return {
        ...state,
        loading: false,
        error: undefined,
        byId: { ...state.byId, [payload.id]: payload }
      };
    default:
      return categoriesIndexedStateReducer(state, action);
  }
}
