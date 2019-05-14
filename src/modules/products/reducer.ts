/* eslint-disable no-case-declarations */
import { AnyAction } from "redux";

import { createReducerForIndexedState } from "redux/reducerFactory";
import { RootState, ProductsState } from "redux/storeTypes";

import {
  PRODUCT_DELETE,
  PRODUCT_LIST,
  PRODUCT_EDIT,
  PRODUCT_ADD
} from "./actions";
import { Product } from "./api";

export function getAllProductsFromState({ products }: RootState) {
  return {
    loading: products.loading,
    error: products.error,
    data: products.allIds.map(id => products.byId[id])
  };
}

const productsIndexedStateReducer = createReducerForIndexedState<
  Product,
  ProductsState
>(PRODUCT_LIST, PRODUCT_ADD, PRODUCT_DELETE);

export default function products(
  state: ProductsState = {
    byId: {},
    allIds: [],
    loading: false,
    error: undefined
  },
  action: AnyAction
) {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_EDIT.START:
      return { ...state, loading: true };

    case PRODUCT_EDIT.ERROR:
      return { ...state, loading: false, error: payload };

    case PRODUCT_EDIT.SUCCESS:
      return {
        ...state,
        loading: false,
        error: undefined,
        byId: { ...state.byId, [payload.id]: payload }
      };
    default:
      return productsIndexedStateReducer(state, action);
  }
}
