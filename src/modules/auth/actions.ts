import { createAsyncAction } from "redux/actionCreators";
import { RootState, ThunkResult } from "redux/storeTypes";

import * as api from "./api";

export const USER_SIGN_IN = createAsyncAction(
  "USER_SIGN_IN_START",
  "USER_SIGN_IN_SUCCESS",
  "USER_SIGN_IN_ERROR"
);
export const USER_SIGN_OUT = createAsyncAction(
  "USER_SIGN_OUT_START",
  "USER_SIGN_OUT_SUCCESS",
  "USER_SIGN_OUT_ERROR"
);
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

export const getCurrentUserFromState = (
  state: RootState
): api.User | undefined => {
  const { user } = state;
  return user.data;
};

export const createGetCurrentUser = (
  getState: () => RootState
): api.GetCurrentUser => {
  return () => {
    const user = getCurrentUserFromState(getState());
    if (!user) throw new Error("Current user is not available");
    return Promise.resolve(user);
  };
};

export const firebaseSignOut = (): ThunkResult<void> => dispatch => {
  dispatch({ type: USER_SIGN_OUT.START });
  api.signOut().then(
    () => {
      /* no need to dispatch, as triggered by auth observer */
    },
    error => dispatch({ type: USER_SIGN_OUT.ERROR, payload: error })
  );
};

export const userSignIn = ({
  email,
  password
}: {
  email: string;
  password: string;
}): ThunkResult<void> => dispatch => {
  dispatch({ type: USER_SIGN_IN.START });
  api.signIn(email, password).then(
    () => {
      /* no need to dispatch, as triggered by auth observer */
    },
    error => dispatch({ type: USER_SIGN_IN.ERROR, payload: error })
  );
};

export const resetPassword = ({
  email
}: {
  email: string;
}): ThunkResult<void> => dispatch => {
  dispatch({ type: PASSWORD_RESET.START });
  api
    .sendPasswordResetEmail(email)
    .then(
      () => dispatch({ type: PASSWORD_RESET.SUCCESS }),
      error => dispatch({ type: PASSWORD_RESET.ERROR, payload: error })
    );
};

export const userPasswordChange = ({
  currentPassword,
  newPassword
}: {
  currentPassword: string;
  newPassword: string;
}): ThunkResult<void> => (dispatch, getState) => {
  dispatch({ type: PASSWORD_EDIT.START });
  return api
    .changePassword(
      createGetCurrentUser(getState),
      currentPassword,
      newPassword
    )
    .then(
      () => dispatch({ type: PASSWORD_EDIT.SUCCESS }),
      error => dispatch({ type: PASSWORD_EDIT.ERROR, payload: error })
    );
};

export const registerAuthStateObserver = (): ThunkResult<void> => (
  dispatch,
  getState
) => {
  return api.observeAuthState(
    () => dispatch({ type: USER_SIGN_OUT.SUCCESS }),
    getUserProfile => {
      return getUserProfile().then(user =>
        dispatch({ type: USER_SIGN_IN.SUCCESS, payload: user })
      );
    }
  );
};
