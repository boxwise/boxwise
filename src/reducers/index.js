import { combineReducers } from "redux";
import profile from "./profile";
import user from "./user";
import boxes from "./boxes";

export default combineReducers({
  profile,
  user,
  boxes
});
