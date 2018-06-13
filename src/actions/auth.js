import firebase from "../firebase";
import { handleError } from "../utils";
import { fetchProfile } from "./profile";

const USER_SIGN_IN_ = TYPE => `USER_SIGN_IN_${TYPE}`;
export const USER_SIGN_IN_START = USER_SIGN_IN_`START`;
export const USER_SIGN_IN_SUCCESS = USER_SIGN_IN_`SUCCESS`;
export const USER_SIGN_IN_ERROR = USER_SIGN_IN_`ERROR`;

export const userSignInSuccess = user => dispatch => {
  const payload = user.toJSON();
  dispatch({ type: USER_SIGN_IN_SUCCESS, payload });
  dispatch(fetchProfile(payload));
};

export const userSignIn = ({ email, password }) => dispatch => {
  dispatch({ type: USER_SIGN_IN_START });
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => dispatch(userSignInSuccess(user)))
    .catch(error => {
      handleError(error);
      dispatch({ type: USER_SIGN_IN_ERROR, payload: error });
    });
};
