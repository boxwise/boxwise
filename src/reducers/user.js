import {
  USER_SIGN_ERROR,
  USER_SIGN_IN_START,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
  PASSWORD_RESET_START,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR
} from "../actions/auth";

export default function user(
  state = { loading: false, hasTriggeredReset: false, data: null, error: null },
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

    case PASSWORD_RESET_START:
      return { ...state, loading: true, hasTriggeredReset: false };

    case PASSWORD_RESET_SUCCESS:
      return { ...state, loading: false, hasTriggeredReset: true };

    case PASSWORD_RESET_ERROR:
      return {
        ...state,
        loading: false,
        hasTriggeredReset: false,
        error: payload
      };

    default:
      return state;
  }
}
