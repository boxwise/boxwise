import {
  USER_SIGN_ERROR,
  USER_SIGN_IN_START,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT
} from "../actions/auth";

export const userReducer = (
  state = { isFetching: false, data: null, error: null },
  { type, payload }
) => {
  switch (type) {
    case USER_SIGN_IN_START:
      return { ...state, isFetching: true };

    case USER_SIGN_IN_SUCCESS:
      return { ...state, isFetching: false, data: payload };

    case USER_SIGN_ERROR:
      return { ...state, isFetching: false, error: payload };

    case USER_SIGN_OUT:
      return { ...state, data: null };

    default:
      return state;
  }
};
