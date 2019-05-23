import { createAsyncAction } from "redux/actionCreators";
import { createGetCurrentUser } from "modules/auth/actions";
import { createThunkWithState, createThunk } from "redux/thunkFactory";

import * as api from "./api";

export const CATEGORY_LIST = createAsyncAction(
  "CATEGORY_LIST_START",
  "CATEGORY_LIST_SUCCESS",
  "CATEGORY_LIST_ERROR"
);
export const CATEGORY_ADD = createAsyncAction(
  "CATEGORY_ADD_START",
  "CATEGORY_ADD_SUCCESS",
  "CATEGORY_ADD_ERROR"
);
export const CATEGORY_EDIT = createAsyncAction(
  "CATEGORY_EDIT_START",
  "CATEGORY_EDIT_SUCCESS",
  "CATEGORY_EDIT_ERROR"
);
export const CATEGORY_DELETE = createAsyncAction(
  "CATEGORY_DELETE_START",
  "CATEGORY_DELETE_SUCCESS",
  "CATEGORY_DELETE_ERROR"
);

export const getAllCategories = createThunkWithState(CATEGORY_LIST, getState =>
  api.getAllCategories(createGetCurrentUser(getState))
);

export const addCategory = createThunkWithState(
  CATEGORY_ADD,
  (getState, category) =>
    api.addCategory(category, createGetCurrentUser(getState))
);

export const updateCategory = createThunk(CATEGORY_EDIT, category =>
  api.updateCategory(category)
);

export const deleteCategory = createThunk(CATEGORY_DELETE, categoryId =>
  api.deleteCategory(categoryId).then(() => categoryId)
);
