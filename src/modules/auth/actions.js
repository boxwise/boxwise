import { firebase } from "firebaseFactory";
import { fetchProfile } from "modules/profile/actions";
import { createAsyncAction } from "redux/actionCreators";

export const USER_SIGN_IN = createAsyncAction(
  "USER_SIGN_IN_START",
  "USER_SIGN_IN_SUCCESS",
  "USER_SIGN_IN_ERROR"
);
export const USER_NOT_SIGN_IN = "USER_NOT_SIGN_IN";
export const USER_SIGN_OUT = "USER_SIGN_OUT";

export const PASSWORD_RESET = createAsyncAction(
  "PASSWORD_RESET_START",
  "PASSWORD_RESET_SUCCESS",
  "PASSWORD_RESET_ERROR"
);
export const PASSWORD_EDIT = createAsyncAction(
  "PASSWORD_EDIT_START",
  "PASSWORD_EDIT_SUCCESS",
  "PASSWORD_EDIT_ERROR"
);

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
    .then(
      ({ user }) => dispatch(userSignInSuccess(user)),
      error => dispatch({ type: USER_SIGN_IN.ERROR, payload: error })
    );
};

export const resetPassword = ({ email }) => dispatch => {
  dispatch({ type: PASSWORD_RESET.START });
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(
      () => dispatch({ type: PASSWORD_RESET.SUCCESS }),
      error => dispatch({ type: PASSWORD_RESET.ERROR, payload: error })
    );
};

export const userPasswordChange = ({ currentPassword, newPassword }) => (
  dispatch,
  getState
) => {
  const { email } = getState().user.data;
  dispatch({ type: PASSWORD_EDIT.START });
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, currentPassword)
    .then(({ user }) => user.updatePassword(newPassword))
    .then(
      () => dispatch({ type: PASSWORD_EDIT.SUCCESS }),
      error => dispatch({ type: PASSWORD_EDIT.ERROR, payload: error })
    );
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
