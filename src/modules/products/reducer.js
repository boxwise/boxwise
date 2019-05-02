/* eslint-disable no-case-declarations */
import {
  PRODUCT_DELETE,
  PRODUCT_LIST,
  PRODUCT_EDIT,
  PRODUCT_ADD
} from "./actions";

export function getAllProducts({ products }) {
  return {
    loading: products.loading,
    error: products.error,
    data: products.allIds.map(id => products.byId[id])
  };
}

export default function products(
  state = {
    byId: {},
    allIds: [],
    loading: false,
    error: null
  },
  { type, payload }
) {
  switch (type) {
    case PRODUCT_ADD.SUCCESS:
      return {
        ...state,
        loading: false,
        allIds: [...state.byId, payload.id],
        byId: { ...state.byId, [payload.id]: payload }
      };

    case PRODUCT_LIST.SUCCESS:
      const indexedById = payload.reduce((obj, row) => {
        return { ...obj, [row.id]: row };
      }, {});

      return {
        ...state,
        allIds: payload.map(item => item.id),
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
