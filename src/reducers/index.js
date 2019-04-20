import { combineReducers } from "redux";

import user from "modules/auth/reducer";
import products from "modules/products/reducer";

import profile from "./profile";
import boxes from "./boxes";

export default combineReducers({
  products,
  profile,
  user,
  boxes
});
