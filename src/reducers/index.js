import { combineReducers } from "redux";

import user from "modules/auth/reducer";

import profile from "./profile";
import boxes from "./boxes";
import products from "./products";

export default combineReducers({
  products,
  profile,
  user,
  boxes
});
