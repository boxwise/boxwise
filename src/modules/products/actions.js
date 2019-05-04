import { firebase, db } from "firebaseFactory";
import {
  addAction,
  listAction,
  editAction,
  deleteAction
} from "commons/utils/action-creators";

export const PRODUCT_LIST = listAction("product");
export const PRODUCT_ADD = addAction("product");
export const PRODUCT_EDIT = editAction("product");
export const PRODUCT_DELETE = deleteAction("product");

// ***** Thunks ***** //

const getProductFromData = doc => {
  const data = doc.data();
  // we don't want to just store raw firebase data in here
  // else you get a load of firebase variables in the redux store
  return {
    id: doc.id,
    name: data.name,
    category: data.category,
    organizationId: data.organization.id,
    createdAt: data.createdAt,
    createdById: data.createdBy.id,
    isDeleted: data.isDeleted
  };
};

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
    .then(({ docs }) => docs.map(getProductFromData))
    .then(
      payload => dispatch({ type: PRODUCT_LIST.SUCCESS, payload }),
      err => dispatch({ type: PRODUCT_LIST.ERROR, payload: err })
    );
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
    .then(
      res =>
        dispatch({
          type: PRODUCT_ADD.SUCCESS,
          payload: getProductFromData(res)
        }),
      err => dispatch({ type: PRODUCT_ADD.ERROR, payload: err })
    );
};

export const productEdit = product => dispatch => {
  dispatch({ type: PRODUCT_EDIT.START });
  const ref = db.collection("products").doc(product.id);

  return ref
    .update(product)
    .then(() => ref.get())
    .then(
      res =>
        dispatch({
          type: PRODUCT_EDIT.SUCCESS,
          payload: getProductFromData(res)
        }),
      err => dispatch({ type: PRODUCT_EDIT.ERROR, payload: err })
    );
};

export const productDelete = productId => dispatch => {
  dispatch({ type: PRODUCT_DELETE.START, payload: productId });

  return db
    .collection("products")
    .doc(productId)
    .update({ isDeleted: true })
    .then(
      () => dispatch({ type: PRODUCT_DELETE.SUCCESS, payload: productId }),
      err => dispatch({ type: PRODUCT_DELETE.ERROR, paylod: err })
    );
};
