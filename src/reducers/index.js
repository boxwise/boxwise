import { combineReducers } from "redux";

import profile from "./profile";
import user from "./user";
import boxes from "./boxes";
import products from "./products";

export default combineReducers({
  products,
  profile,
  user,
  boxes
});
