import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import firebase from "./firebase";
import rootReducer from "./reducers";
import { userSignInSuccess, userSignOut } from "./actions/auth";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// Hook up firebase to Redux store
// FIXME: It should be turned in a action and registered at app bootstrap
firebase
  .auth()
  .onAuthStateChanged(
    user => (user ? store.dispatch(userSignInSuccess(user)) : userSignOut())
  );

export default store;
