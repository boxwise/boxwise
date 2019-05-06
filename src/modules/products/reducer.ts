/* eslint-disable no-case-declarations */
import { AnyAction } from "redux";

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

export default function products(
  state: ProductsState = {
    byId: {},
    allIds: [],
    loading: false,
    error: undefined,
    isDeletingId: undefined
  },
  { type, payload }: AnyAction
) {
  switch (type) {
    case PRODUCT_ADD.SUCCESS:
      return {
        ...state,
        loading: false,
        allIds: [...state.allIds, payload.id],
        byId: { ...state.byId, [payload.id]: payload }
      };

    case PRODUCT_LIST.SUCCESS:
      const products = payload as Product[];
      const indexedById = products.reduce((obj, row) => {
        return { ...obj, [row.id]: row };
      }, {});

      return {
        ...state,
        allIds: products.map(item => item.id),
        byId: indexedById,
        loading: false
      };

    case PRODUCT_EDIT.SUCCESS:
      return {
        ...state,
        loading: false,
        byId: { ...state.byId, [payload.id]: payload }
      };

    case PRODUCT_LIST.ERROR:
    case PRODUCT_EDIT.ERROR:
      return { ...state, error: payload };

    case PRODUCT_ADD.START:
    case PRODUCT_LIST.START:
    case PRODUCT_EDIT.START:
      return { ...state };
    case PRODUCT_DELETE.START:
      return { ...state, isDeletingId: payload };

    case PRODUCT_DELETE.SUCCESS:
      if (!state.isDeletingId) return state;
      const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        [state.isDeletingId]: _,
        ...remainingProductsById
      } = state.byId;

      return {
        ...state,
        isDeletingId: null,
        allIds: state.allIds.filter(id => id !== state.isDeletingId),
        byId: remainingProductsById
      };

    case PRODUCT_DELETE.ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
}
