import firebase from "firebase/app";

import {
  addAction,
  listAction,
  editAction,
  deleteAction
} from "commons/utils/action-creators";
import { captureException } from "errorHandling";

export const PRODUCT_LIST = listAction("product");
export const PRODUCT_ADD = addAction("product");
export const PRODUCT_EDIT = editAction("product");
export const PRODUCT_DELETE = deleteAction("product");

const db = firebase.firestore();

// ***** Plain Actions ***** //

export const productDeleteConfirm = productId => ({
  type: PRODUCT_DELETE.CONFIRM,
  payload: productId
});

export const productDeleteCancel = () => ({ type: PRODUCT_DELETE.CANCEL });

// ***** Thunks ***** //

export const productList = () => (dispatch, getState) => {
  const { organization } = getState().profile.data;
  dispatch({ type: PRODUCT_LIST.START });

  return db
    .collection("products")
    .where("organization", "==", db.doc(organization.ref))
    .where("isDeleted", "==", false)
    .orderBy("category", "asc")
    .orderBy("name", "asc")
    .get()
    .then(({ docs }) => docs.map(doc => ({ id: doc.id, ...doc.data() })))
    .then(payload => dispatch({ type: PRODUCT_LIST.SUCCESS, payload }))
    .catch(err => {
      captureException(err);
      dispatch({ type: PRODUCT_LIST.ERROR, payload: err });
    });
};

export const productAdd = product => (dispatch, getState) => {
  const { profile } = getState();

  const values = {
    ...product,
    organization: db.doc(profile.data.organization.ref),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    createdBy: db.doc(profile.data.ref),
    isDeleted: false
  };

  dispatch({ type: PRODUCT_ADD.START });
  return db
    .collection("products")
    .add(values)
    .then(ref => ref.get())
    .then(res => dispatch({ type: PRODUCT_ADD.SUCCESS, payload: res.data() }))
    .catch(err => {
      captureException(err); // TODO: actually handle the error
      dispatch({ type: PRODUCT_ADD.ERROR, payload: err });
    });
};

export const productEdit = product => dispatch => {
  dispatch({ type: PRODUCT_EDIT.START });
  const ref = db.collection("products").doc(product.id);

  return ref
    .update(product)
    .then(() => ref.get())
    .then(res => dispatch({ type: PRODUCT_EDIT.SUCCESS, payload: res.data() }))
    .catch(err => {
      captureException(err); // TODO: actually handle the error
      dispatch({ type: PRODUCT_EDIT.ERROR, payload: err });
    });
};

export const productDelete = productId => dispatch => {
  dispatch({ type: PRODUCT_DELETE.START });

  return db
    .collection("products")
    .doc(productId)
    .update({ isDeleted: true })
    .then(() => dispatch({ type: PRODUCT_DELETE.SUCCESS }))
    .catch(err => {
      captureException(err);
      dispatch({ type: PRODUCT_DELETE.ERROR });
    });
};
