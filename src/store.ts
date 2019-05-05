/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";

import user from "modules/auth/reducer";
import products from "modules/products/reducer";
import boxes from "modules/boxes/reducer";
import profile from "modules/profile/reducer";
import { logErrorActionsAsExceptions, sentryMiddleware } from "errorHandling";
import { RootState } from "storeTypes";

const rootReducer = combineReducers<RootState>({
  products,
  profile,
  user,
  boxes
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk, sentryMiddleware, logErrorActionsAsExceptions)
  )
);

export default store;
