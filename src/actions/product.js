import firebase, { firestore } from "../firebase";
import { handleError } from "../utils";

const PRODUCT_LIST_ = TYPE => `PRODUCT_LIST_${TYPE}`;
const PRODUCT_ADD_ = TYPE => `PRODUCT_ADD_${TYPE}`;
const PRODUCT_EDIT_ = TYPE => `PRODUCT_EDIT_${TYPE}`;
const PRODUCT_DELETE_ = TYPE => `PRODUCT_DELETE_${TYPE}`;

export const PRODUCT_LIST_START = PRODUCT_LIST_`START`;
export const PRODUCT_LIST_SUCCESS = PRODUCT_LIST_`SUCCESS`;
export const PRODUCT_LIST_ERROR = PRODUCT_LIST_`ERROR`;

export const PRODUCT_ADD_START = PRODUCT_ADD_`START`;
export const PRODUCT_ADD_SUCCESS = PRODUCT_ADD_`SUCCESS`;
export const PRODUCT_ADD_ERROR = PRODUCT_ADD_`ERROR`;

export const PRODUCT_EDIT_START = PRODUCT_EDIT_`START`;
export const PRODUCT_EDIT_SUCCESS = PRODUCT_EDIT_`SUCCESS`;
export const PRODUCT_EDIT_ERROR = PRODUCT_EDIT_`ERROR`;

export const PRODUCT_DELETE_CONFIRM = PRODUCT_DELETE_`CONFIRM`;
export const PRODUCT_DELETE_CANCEL = PRODUCT_DELETE_`CANCEL`;
export const PRODUCT_DELETE_START = PRODUCT_DELETE_`START`;
export const PRODUCT_DELETE_SUCCESS = PRODUCT_DELETE_`SUCCESS`;
export const PRODUCT_DELETE_ERROR = PRODUCT_DELETE_`ERROR`;

// ***** Plain Actions ***** //

export const productDeleteConfirm = productId => ({
  type: PRODUCT_DELETE_CONFIRM,
  payload: productId
});

export const productDeleteCancel = () => ({ type: PRODUCT_DELETE_CANCEL });

// ***** Thunks ***** //

export const productList = () => (dispatch, getState) => {
  const { organization } = getState().profile.data;
  dispatch({ type: PRODUCT_LIST_START });

  return firestore
    .collection("products")
    .where("organization", "==", firestore.doc(organization.ref))
    .where("isDeleted", "==", false)
    .orderBy("category", "asc")
    .orderBy("name", "asc")
    .get()
    .then(({ docs }) => docs.map(doc => ({ id: doc.id, ...doc.data() })))
    .then(payload => dispatch({ type: PRODUCT_LIST_SUCCESS, payload }))
    .catch(err => {
      handleError(err);
      dispatch({ type: PRODUCT_LIST_ERROR, payload: err });
    });
};

export const productAdd = product => (dispatch, getState) => {
  const { profile } = getState();

  const values = {
    ...product,
    organization: firestore.doc(profile.data.organization.ref),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    createdBy: firestore.doc(profile.data.ref),
    isDeleted: false
  };

  dispatch({ type: PRODUCT_ADD_START });
  return firestore
    .collection("products")
    .add(values)
    .then(ref => ref.get())
    .then(res => dispatch({ type: PRODUCT_ADD_SUCCESS, payload: res.data() }))
    .catch(err => {
      handleError(err); // TODO: actually handle the error
      dispatch({ type: PRODUCT_ADD_ERROR, payload: err });
    });
};

export const productEdit = product => dispatch => {
  dispatch({ type: PRODUCT_EDIT_START });
  const ref = firestore.collection("products").doc(product.id);

  return ref
    .update(product)
    .then(() => ref.get())
    .then(res => dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: res.data() }))
    .catch(err => {
      handleError(err); // TODO: actually handle the error
      dispatch({ type: PRODUCT_EDIT_ERROR, payload: err });
    });
};

export const productDelete = productId => dispatch => {
  dispatch({ type: PRODUCT_DELETE_START });

  return firestore
    .collection("products")
    .doc(productId)
    .update({ isDeleted: true })
    .then(() => dispatch({ type: PRODUCT_DELETE_SUCCESS }))
    .catch(err => {
      handleError(err);
      dispatch({ type: PRODUCT_DELETE_ERROR });
    });
};
