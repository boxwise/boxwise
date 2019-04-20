import {
  PRODUCT_DELETE,
  PRODUCT_LIST,
  PRODUCT_EDIT,
  PRODUCT_ADD
} from "./actions";

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
    case PRODUCT_ADD.SUCCESS:
      return { ...state, loading: false, data: [payload, ...state.data] };

    case PRODUCT_LIST.SUCCESS:
      return { ...state, data: payload, loading: false };

    case PRODUCT_EDIT.SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map(prod => (prod.id === payload.id ? payload : prod))
      };

    case PRODUCT_LIST.ERROR:
    case PRODUCT_EDIT.ERROR:
      return { ...state, error: payload };

    case PRODUCT_DELETE.CONFIRM:
      return { ...state, confirmDeleteOf: payload };

    case PRODUCT_DELETE.CANCEL:
      return { ...state, confirmDeleteOf: null };

    case PRODUCT_ADD.START:
    case PRODUCT_LIST.START:
    case PRODUCT_EDIT.START:
    case PRODUCT_DELETE.START:
      return { ...state, loading: true };

    case PRODUCT_DELETE.SUCCESS:
      return {
        ...state,
        confirmDeleteOf: null,
        loading: false,
        data: state.data.filter(prod => prod.id !== state.confirmDeleteOf)
      };

    case PRODUCT_DELETE.ERROR:
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
