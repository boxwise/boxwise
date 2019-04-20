import { combineReducers } from "redux";

import user from "modules/auth/reducer";
import products from "modules/products/reducer";
import boxes from "modules/boxes/reducer";

import profile from "./profile";

export default combineReducers({
  products,
  profile,
  user,
  boxes
});
