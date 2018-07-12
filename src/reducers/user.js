import {
  PASSWORD_CHANGE_ERROR,
  PASSWORD_CHANGE_START,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_RESET_ERROR,
  PASSWORD_RESET_START,
  PASSWORD_RESET_SUCCESS,
  USER_NOT_LOGGED,
  USER_SIGN_ERROR,
  USER_SIGN_IN_START,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT
} from "../actions/auth";

export default function user(
  state = {
    loading: null,
    hasTriggeredReset: false,
    data: null,
    error: null
  },
  { type, payload }
) {
  switch (type) {
    case USER_SIGN_IN_START:
      return { ...state, error: null, loading: true };

    case USER_SIGN_IN_SUCCESS:
      return { ...state, loading: false, data: payload };

    case USER_SIGN_ERROR:
      return { ...state, loading: false, error: payload };

    case USER_NOT_LOGGED:
      return { ...state, loading: false };

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

    case PASSWORD_CHANGE_START:
      return { ...state, isUpdating: true, error: null };

    case PASSWORD_CHANGE_SUCCESS:
      return { ...state, isUpdating: false, error: null };

    case PASSWORD_CHANGE_ERROR:
      return { ...state, isUpdating: false, error: payload };

    default:
      return state;
  }
}
