import firebase from "firebase/app";

import { fetchProfile } from "modules/profile/actions";
import { captureException } from "errorHandling";
import { asyncAction, editAction } from "commons/utils/action-creators";

export const USER_SIGN_IN = asyncAction("USER_SIGN_IN");
export const USER_NOT_SIGN_IN = "USER_NOT_SIGN_IN";
export const USER_SIGN_OUT = "USER_SIGN_OUT";

export const PASSWORD_RESET = asyncAction("PASSWORD_RESET");
export const PASSWORD_EDIT = editAction("password");

export const userSignOut = () => ({ type: USER_SIGN_OUT });

export const firebaseSignOut = () => dispatch => {
  firebase
    .auth()
    .signOut()
    .then(() => dispatch(userSignOut()))
    .catch(err => dispatch({ type: USER_SIGN_IN.ERROR, payload: err }));
};

export const userSignInSuccess = user => dispatch => {
  const payload = user.toJSON();
  dispatch({ type: USER_SIGN_IN.SUCCESS, payload });
  dispatch(fetchProfile(payload.uid));
};

export const userSignIn = ({ email, password }) => dispatch => {
  dispatch({ type: USER_SIGN_IN.START });
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => dispatch(userSignInSuccess(user)))
    .catch(error => {
      captureException(error);
      dispatch({ type: USER_SIGN_IN.ERROR, payload: error });
    });
};

export const resetPassword = ({ email }) => dispatch => {
  dispatch({ type: PASSWORD_RESET.START });
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => dispatch({ type: PASSWORD_RESET.SUCCESS }))
    .catch(error => {
      captureException(error);
      dispatch({ type: PASSWORD_RESET.ERROR, payload: error });
    });
};

export const userPasswordChange = ({
  email,
  currentPassword,
  newPassword
}) => dispatch => {
  dispatch({ type: PASSWORD_EDIT.START });
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, currentPassword)
    .then(({ user }) =>
      user
        .updatePassword(newPassword)
        .then(() => dispatch({ type: PASSWORD_EDIT.SUCCESS }))
        .catch(error => {
          captureException(error);
          dispatch({ type: PASSWORD_EDIT.ERROR, payload: error });
          throw error;
        })
    )
    .catch(error => {
      captureException(error);
      dispatch({ type: PASSWORD_EDIT.ERROR, payload: error });
      throw error;
    });
};

export const registerAuthStateObserver = () => (dispatch, getState) => {
  const { loading } = getState().user;
  if (loading === null) {
    dispatch({ type: USER_SIGN_IN.START });

    return firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        dispatch({ type: USER_NOT_SIGN_IN });
        userSignOut();
      } else dispatch(userSignInSuccess(user));
    });
  }

  return Promise.resolve();
};
