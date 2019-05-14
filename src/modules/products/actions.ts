import { createAsyncAction } from "redux/actionCreators";
import { createGetCurrentUser } from "modules/auth/actions";
import { createThunkWithState, createThunk } from "redux/thunkFactory";

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

export const productList = createThunkWithState(PRODUCT_LIST, getState =>
  api.getAllProducts(createGetCurrentUser(getState))
);

export const productAdd = createThunkWithState(
  PRODUCT_ADD,
  (getState, product) => api.addProduct(product, createGetCurrentUser(getState))
);

export const productEdit = createThunk(PRODUCT_EDIT, product =>
  api.updateProduct(product)
);

export const productDelete = createThunk(PRODUCT_DELETE, productId =>
  api.deleteProduct(productId).then(() => productId)
);
