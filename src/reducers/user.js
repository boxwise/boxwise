import {
  USER_SIGN_IN_ERROR,
  USER_SIGN_IN_START,
  USER_SIGN_IN_SUCCESS
} from "../actions/auth";

export const userReducer = (
  state = { isFetching: false, isEmpty: true },
  { type, payload }
) => {
  switch (type) {
    case USER_SIGN_IN_START:
      return { ...state, isFetching: true };

    case USER_SIGN_IN_SUCCESS:
      return { ...state, isFetching: false, isEmpty: false, ...payload };

    case USER_SIGN_IN_ERROR:
      return { ...state, isFetching: false, error: payload };

    default:
      return state;
  }
};
