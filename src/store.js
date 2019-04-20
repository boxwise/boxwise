import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";

import user from "modules/auth/reducer";
import products from "modules/products/reducer";
import boxes from "modules/boxes/reducer";
import profile from "modules/profile/reducer";

const rootReducer = combineReducers({
  products,
  profile,
  user,
  boxes
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
