import { AnyAction } from "redux";

import { FETCH_PROFILE } from "./actions";

export default function profile(
  state = { loading: false, data: undefined },
  { type, payload }: AnyAction
) {
  switch (type) {
    case FETCH_PROFILE.START:
      return { ...state, loading: true };

    case FETCH_PROFILE.SUCCESS:
      return { ...state, data: payload, loading: false };

    case FETCH_PROFILE.ERROR:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}
