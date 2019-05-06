import { createAsyncAction } from "redux/actionCreators";
import { getCurrentUserFromState } from "modules/auth/reducer";

import * as api from "./api";

export const PRODUCT_LIST = createAsyncAction(
  "PRODUCT_LIST_START",
  "PRODUCT_LIST_SUCCESS",
  "PRODUCT_LIST_ERROR"
);
export const PRODUCT_ADD = createAsyncAction(
  "PRODUCT_ADD_START",
  "PRODUCT_ADD_SUCCESS",
  "PRODUCT_ADD_ERROR"
);
export const PRODUCT_EDIT = createAsyncAction(
  "PRODUCT_EDIT_START",
  "PRODUCT_EDIT_SUCCESS",
  "PRODUCT_EDIT_ERROR"
);
export const PRODUCT_DELETE = createAsyncAction(
  "PRODUCT_DELETE_START",
  "PRODUCT_DELETE_SUCCESS",
  "PRODUCT_DELETE_ERROR"
);

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
