import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";

import user from "modules/auth/reducer";
import products from "modules/products/reducer";
import boxes from "modules/boxes/reducer";
import profile from "modules/profile/reducer";
import { logErrorActionsAsExceptions, sentryMiddleware } from "errorHandling";

const rootReducer = combineReducers({
  products,
  profile,
  user,
  boxes
});

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk, sentryMiddleware, logErrorActionsAsExceptions)
  )
);

export default store;
