import { BOX_ADD_ERROR, BOX_ADD_START, BOX_ADD_SUCCESS } from "./actions";

export default function boxes(
  state = { data: [], loading: false, error: null },
  { type, payload }
) {
  switch (type) {
    case BOX_ADD_START:
      return { ...state, loading: true };

    case BOX_ADD_SUCCESS:
      return { ...state, loading: false, data: [...state.data, payload] };

    case BOX_ADD_ERROR:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}
