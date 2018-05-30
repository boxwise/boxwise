import { SET_PROFILE } from "../actions/profile";

const initialState = { isFetching: true, isEmpty: true };

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      if (!action.profile) {
        return {
          isFetching: false,
          isEmpty: true
        };
      }
      return {
        isFetching: false,
        isEmpty: false,
        ...action.profile
      };
    default:
      return state;
  }
};
