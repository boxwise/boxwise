import firebase from "../firebase";
import { createSlice } from "redux-starter-kit";
import { handleError } from "../utils";
import { fetchProfile } from "./../actions/profile";

const auth = createSlice({
  slice: "auth",
  initialState: {
    loading: null,
    hasTriggeredReset: false,
    data: null,
    error: null
  },
  reducers: {
    setUserSignInStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    setUserSignInSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    setUserSignInError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // what's the difference?
    setUserNotSignIn(state, action) {
      state.loading = false;
    },
    setUserSignOut(state, action) {
      state.data = null;
    },
    setPasswordResetStart(state, action) {
      state.loading = true;
      state.hasTriggeredReset = false;
    },
    setPasswordResetSuccess(state, action) {
      state.loading = false;
      state.hasTriggeredReset = true;
    },
    setPasswordResetError(state, action) {
      state.loading = false;
      state.hasTriggeredReset = false;
      state.error = action.payload;
    },
    setPasswordEditStart(state, action) {
      state.isUpdating = true;
      state.error = null;
    },
    setPasswordEditSuccess(state, action) {
      state.isUpdating = false;
      state.error = null;
    },
    setPasswordEditError(state, action) {
      state.isUpdating = false;
      state.error = action.payload;
    }
  }
});

export const { actions, reducer } = auth;

export default reducer;

export const {
  setUserSignOut,
  setUserNotSignIn,
  setUserSignInError,
  setUserSignInSuccess,
  setUserSignInStart,
  setPasswordResetStart,
  setPasswordResetSuccess,
  setPasswordResetError,
  setPasswordEditStart,
  setPasswordEditSuccess,
  setPasswordEditError
} = actions;

export const firebaseSignOut = () => dispatch => {
  firebase
    .auth()
    .signOut()
    .then(() => dispatch(setUserSignOut()))
    .catch(err => dispatch(setUserSignInError(err)));
};

const userSignInSuccess = user => dispatch => {
  const payload = user.toJSON();
  dispatch(setUserSignInSuccess(payload));
  dispatch(fetchProfile(payload.uid));
};

export const userSignIn = ({ email, password }) => dispatch => {
  dispatch(setUserSignInStart());
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => dispatch(userSignInSuccess(user)))
    .catch(error => {
      handleError(error);
      dispatch(setUserSignInError(error));
    });
};

export const resetPassword = ({ email }) => dispatch => {
  dispatch(setPasswordResetStart());
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => dispatch(setPasswordResetSuccess()))
    .catch(error => {
      handleError(error);
      dispatch(setPasswordResetError(error));
    });
};

export const userPasswordChange = ({
  email,
  currentPassword,
  newPassword
}) => dispatch => {
  dispatch(setPasswordEditStart());
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, currentPassword)
    .then(({ user }) =>
      user
        .updatePassword(newPassword)
        .then(() => dispatch(setPasswordEditSuccess()))
        .catch(error => {
          handleError(error);
          dispatch(setPasswordEditError(error));
          throw error;
        })
    )
    .catch(error => {
      handleError(error);
      dispatch(setPasswordEditError(error));
      throw error;
    });
};

export const registerAuthStateObserver = () => (dispatch, getState) => {
  const { loading } = getState().user;
  if (loading === null) {
    dispatch(setUserSignInStart());

    return firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        dispatch(setUserNotSignIn());
        dispatch(setUserSignOut());
      } else dispatch(userSignInSuccess(user));
    });
  }

  return Promise.resolve();
};
