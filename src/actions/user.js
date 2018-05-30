import { fetchProfile, setProfile } from "./profile";
export const SET_USER = "SET_USER";

// Set current user from Firebase's user object, and fetch associated profile
export const setUser = user => {
  return dispatch => {
    if (user) {
      dispatch({ type: SET_USER, user: user.toJSON() });
      dispatch(fetchProfile(user));
    } else {
      dispatch({ type: SET_USER, user: null });
      dispatch(setProfile(null));
    }
  };
};
