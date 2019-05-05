import { RootAction } from "redux/storeTypes";

import { BOX_ADD } from "./actions";

export default function boxes(
  state = { data: [], loading: false, error: null },
  { type, payload }: RootAction
) {
  switch (type) {
    case BOX_ADD.START:
      return { ...state, loading: true };

    case BOX_ADD.SUCCESS:
      return { ...state, loading: false, data: [...state.data, payload] };

    case BOX_ADD.ERROR:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}
