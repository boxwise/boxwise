import firebase from "../firebase";
import { handleError } from "../utils";
import { fetchProfile } from "./profile";

const USER_SIGN_ = TYPE => `USER_SIGN_IN_${TYPE}`;
export const USER_SIGN_IN_START = USER_SIGN_`IN_START`;
export const USER_SIGN_IN_SUCCESS = USER_SIGN_`IN_SUCCESS`;
export const USER_SIGN_ERROR = USER_SIGN_`ERROR`;
export const USER_SIGN_OUT = USER_SIGN_`OUT`;

const PASSWORD_RESET_ = TYPE => `PASSWORD_RESET_${TYPE}`;
export const PASSWORD_RESET_START = PASSWORD_RESET_`START`;
export const PASSWORD_RESET_SUCCESS = PASSWORD_RESET_`SUCCESS`;
export const PASSWORD_RESET_ERROR = PASSWORD_RESET_`ERROR`;

export const userSignOut = () => ({ type: USER_SIGN_OUT });

export const firebaseSignOut = () => dispatch => {
  firebase
    .auth()
    .signOut()
    .then(() => dispatch(userSignOut()))
    .catch(err => dispatch({ type: USER_SIGN_ERROR, payload: err }));
};

export const userSignInSuccess = user => dispatch => {
  const payload = user.toJSON();
  dispatch({ type: USER_SIGN_IN_SUCCESS, payload });
  dispatch(fetchProfile(payload.uid));
};

export const userSignIn = ({ email, password }) => dispatch => {
  dispatch({ type: USER_SIGN_IN_START });
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => dispatch(userSignInSuccess(user)))
    .catch(error => {
      handleError(error);
      dispatch({ type: USER_SIGN_ERROR, payload: error });
    });
};

export const resetPassword = ({ email }) => dispatch => {
  dispatch({ type: PASSWORD_RESET_START });
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => dispatch({ type: PASSWORD_RESET_SUCCESS }))
    .catch(error => {
      handleError(error);
      dispatch({ type: PASSWORD_RESET_ERROR, payload: error });
    });
};
