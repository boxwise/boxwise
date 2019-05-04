import {
  addAction,
  listAction,
  editAction,
  deleteAction
} from "commons/utils/action-creators";

import * as api from "./api";

export const PRODUCT_LIST = listAction("product");
export const PRODUCT_ADD = addAction("product");
export const PRODUCT_EDIT = editAction("product");
export const PRODUCT_DELETE = deleteAction("product");

const getCurrentUserFromState = getState => {
  const { profile } = getState();
  return {
    organizationRef: profile.data.organization.ref,
    userProfileRef: profile.data.ref
  };
};

export const productList = () => (dispatch, getState) => {
  dispatch({ type: PRODUCT_LIST.START });
  return api
    .getAllProducts(getCurrentUserFromState(getState))
    .then(
      allProducts =>
        dispatch({ type: PRODUCT_LIST.SUCCESS, payload: allProducts }),
      err => dispatch({ type: PRODUCT_LIST.ERROR, payload: err })
    );
};

export const productAdd = product => (dispatch, getState) => {
  dispatch({ type: PRODUCT_ADD.START });
  return api
    .addProduct(product, getCurrentUserFromState(getState))
    .then(
      product => dispatch({ type: PRODUCT_ADD.SUCCESS, payload: product }),
      err => dispatch({ type: PRODUCT_ADD.ERROR, payload: err })
    );
};

export const productEdit = product => dispatch => {
  dispatch({ type: PRODUCT_EDIT.START });
  return api
    .updateProduct(product)
    .then(
      product => dispatch({ type: PRODUCT_EDIT.SUCCESS, payload: product }),
      err => dispatch({ type: PRODUCT_EDIT.ERROR, payload: err })
    );
};

export const productDelete = productId => dispatch => {
  dispatch({ type: PRODUCT_DELETE.START, payload: productId });
  return api
    .deleteProduct(productId)
    .then(
      () => dispatch({ type: PRODUCT_DELETE.SUCCESS, payload: productId }),
      err => dispatch({ type: PRODUCT_DELETE.ERROR, paylod: err })
    );
};
