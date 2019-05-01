import {
  PRODUCT_DELETE,
  PRODUCT_LIST,
  PRODUCT_EDIT,
  PRODUCT_ADD
} from "./actions";

export default function products(
  state = {
    data: null,
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

    case PRODUCT_ADD.START:
    case PRODUCT_LIST.START:
    case PRODUCT_EDIT.START:
      return { ...state };
    case PRODUCT_DELETE.START:
      return { ...state, isDeletingId: payload };

    case PRODUCT_DELETE.SUCCESS:
      return {
        ...state,
        isDeletingId: null,
        data: state.data.filter(prod => prod.id !== state.isDeletingId)
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
