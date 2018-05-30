import { combineReducers } from "redux";
import { profileReducer } from "./profile";
import { userReducer } from "./user";

const rootReducer = combineReducers({
  profile: profileReducer,
  user: userReducer
});

export default rootReducer;
