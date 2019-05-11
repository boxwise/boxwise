import { firebase, db } from "firebaseFactory";
import { createAsyncAction } from "redux/actionCreators";
import {
  createGetCurrentUser,
  getCurrentUserFromState
} from "modules/auth/actions";

import * as api from "./api";

export const BOX_ADD = createAsyncAction(
  "BOX_ADD_START",
  "BOX_ADD_SUCCESS",
  "BOX_ADD_ERROR"
);

export const BOX_LIST = createAsyncAction(
  "BOX_LIST_START",
  "BOX_LIST_SUCCESS",
  "BOX_LIST_ERROR"
);

export const fetchBoxes = () => (dispatch, getState) => {
  dispatch({ type: BOX_LIST.START });
  return api
    .fetchActiveBoxes(createGetCurrentUser(getState))
    .then(
      boxes => dispatch({ type: BOX_LIST.SUCCESS, payload: boxes }),
      error => dispatch({ type: BOX_ADD.ERROR, payload: error })
    );
};

export const addBox = ({ product, quantity, comment }) => (
  dispatch,
  getState
) => {
  const currentUser = getCurrentUserFromState(getState());
  dispatch({ type: BOX_ADD.START });
  const box = {
    quantity,
    comment,
    organization: db.doc(currentUser.organizationRef),
    product: db.doc(`products/${product.id}`),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    createdBy: db.doc(currentUser.userProfileRef),
    humanID: Math.floor(Math.random() * 1000000)
  };

  return db
    .collection("boxes")
    .add(box)
    .then(ref => ref.get())
    .then(box => box.data())
    .then(
      box => {
        dispatch({ type: BOX_ADD.SUCCESS, payload: box });
        return { error: false, data: box };
      },
      error => {
        dispatch({ type: BOX_ADD.ERROR, payload: error });
        return { error };
      }
    );
};
