import { createAsyncAction } from "redux/actionCreators";
import { createThunkWithState } from "redux/thunkFactory";
import { createGetCurrentUser } from "modules/auth/actions";

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

export const fetchBoxes = createThunkWithState(BOX_LIST, getState =>
  api.fetchActiveBoxes(createGetCurrentUser(getState))
);

export const addBox = createThunkWithState(
  BOX_ADD,
  (getState, { productId, quantity, comment }) =>
    api.addBox(quantity, comment, productId, createGetCurrentUser(getState))
);
