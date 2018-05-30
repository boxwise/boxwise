import { SET_USER } from "../actions/user";

const initialState = { isFetching: true, isEmpty: true };

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      if (!action.user) {
        return {
          isFetching: false,
          isEmpty: true
        };
      }
      return {
        isFetching: false,
        isEmpty: false,
        ...action.user
      };
    default:
      return state;
  }
};
