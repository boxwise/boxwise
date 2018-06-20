import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { FirestoreProvider } from "react-firestore";
import Raven from "raven-js";
import { IntlProvider } from "react-intl";
import App from "./App";
import Config from "./Config";
import registerServiceWorker from "./registerServiceWorker";
import firebase from "./firebase";
import store from "./store";

if (Config.SENTRY_URI) {
  Raven.config(Config.SENTRY_URI).install();
}

Raven.context(function() {
  ReactDOM.render(
    <FirestoreProvider firebase={firebase}>
      <Provider store={store}>
        <IntlProvider locale="en">
          <App />
        </IntlProvider>
      </Provider>
    </FirestoreProvider>,
    document.getElementById("root")
  );
  registerServiceWorker();
});
