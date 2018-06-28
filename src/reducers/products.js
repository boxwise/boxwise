import {
  PRODUCT_DELETE_START,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_ERROR,
  PRODUCT_DELETE_CONFIRM,
  PRODUCT_DELETE_CANCEL,
  PRODUCT_LIST_START,
  PRODUCT_EDIT_START,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_LIST_ERROR,
  PRODUCT_EDIT_ERROR,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_START
} from "../actions/product";

export default function products(
  state = {
    data: null,
    confirmDeleteOf: null,
    loading: false,
    error: null
  },
  { type, payload }
) {
  switch (type) {
    case PRODUCT_ADD_SUCCESS:
      return { ...state, loading: false, data: [payload, ...state.data] };

    case PRODUCT_LIST_SUCCESS:
      return { ...state, data: payload, loading: false };

    case PRODUCT_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map(prod => (prod.id === payload.id ? payload : prod))
      };

    case PRODUCT_LIST_ERROR:
    case PRODUCT_EDIT_ERROR:
      return { ...state, error: payload };

    case PRODUCT_DELETE_CONFIRM:
      return { ...state, confirmDeleteOf: payload };

    case PRODUCT_DELETE_CANCEL:
      return { ...state, confirmDeleteOf: null };

    case PRODUCT_ADD_START:
    case PRODUCT_LIST_START:
    case PRODUCT_EDIT_START:
    case PRODUCT_DELETE_START:
      return { ...state, loading: true };

    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        confirmDeleteOf: null,
        loading: false,
        data: state.data.filter(prod => prod.id !== state.confirmDeleteOf)
      };

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
