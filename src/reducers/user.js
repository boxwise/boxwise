import {
  USER_SIGN_ERROR,
  USER_SIGN_IN_START,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT
} from "../actions/auth";

export default function user(
  state = { loading: false, data: null, error: null },
  { type, payload }
) {
  switch (type) {
    case USER_SIGN_IN_START:
      return { ...state, loading: true };

    case USER_SIGN_IN_SUCCESS:
      return { ...state, loading: false, data: payload };

    case USER_SIGN_ERROR:
      return { ...state, loading: false, error: payload };

    case USER_SIGN_OUT:
      return { ...state, data: null };

    default:
      return state;
  }
}
