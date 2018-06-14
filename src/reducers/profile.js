import {
  FETCH_PROFILE_ERROR,
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS
} from "../actions/profile";

export const profileReducer = (
  state = { isFetching: true, data: null },
  { type, payload }
) => {
  switch (type) {
    case FETCH_PROFILE_START:
      return { ...state, isFetching: true };

    case FETCH_PROFILE_SUCCESS:
      return { ...state, data: payload, isFetching: false };

    case FETCH_PROFILE_ERROR:
      return { ...state, isFetching: false, error: payload };

    default:
      return state;
  }
};
