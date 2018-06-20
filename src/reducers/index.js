import { combineReducers } from "redux";
import { profileReducer } from "./profile";
import { userReducer } from "./user";
import { dialogReducer } from "./dialog";

const rootReducer = combineReducers({
  profile: profileReducer,
  user: userReducer,
  dialog: dialogReducer
});

export default rootReducer;
