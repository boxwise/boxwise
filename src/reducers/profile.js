import {
  FETCH_PROFILE_ERROR,
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS
} from "actions/profile";

export default function profile(
  state = { loading: true, data: null },
  { type, payload }
) {
  switch (type) {
    case FETCH_PROFILE_START:
      return { ...state, loading: true };

    case FETCH_PROFILE_SUCCESS:
      return { ...state, data: payload, loading: false };

    case FETCH_PROFILE_ERROR:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}
