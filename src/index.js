import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { FirestoreProvider } from "react-firestore";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import firebase from "./firebase";
import store from "./store";

ReactDOM.render(
  <FirestoreProvider firebase={firebase}>
    <Provider store={store}>
      <App />
    </Provider>
  </FirestoreProvider>,
  document.getElementById("root")
);
registerServiceWorker();
