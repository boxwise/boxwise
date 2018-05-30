import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import firebase from "./firebase";
import rootReducer from "./reducers";
import { setUser } from "./actions/user";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// Hook up firebase to Redux store
firebase.auth().onAuthStateChanged(user => store.dispatch(setUser(user)));

export default store;
