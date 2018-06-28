import {
  PRODUCT_DELETE_START,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_ERROR,
  PRODUCT_DELETE_CONFIRM,
  PRODUCT_DELETE_CANCEL
} from "../actions/product";

export default function products(
  state = {
    products: null,
    confirmDeleteOf: null,
    loading: false,
    error: null
  },
  { type, payload }
) {
  switch (type) {
    case PRODUCT_DELETE_CONFIRM:
      return { ...state, confirmDeleteOf: payload };

    case PRODUCT_DELETE_CANCEL:
      return { ...state, confirmDeleteOf: null };

    case PRODUCT_DELETE_START:
      return { ...state, loading: true };

    case PRODUCT_DELETE_SUCCESS:
      return { ...state, confirmDeleteOf: null, loading: false };

    case PRODUCT_DELETE_ERROR:
      return {
        ...state,
        loading: false,
        confirmDeleteOf: null,
        error: payload
      };

    default:
      return state;
  }
}
