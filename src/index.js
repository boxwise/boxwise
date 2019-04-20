import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { FirestoreProvider } from "react-firestore";
import * as Sentry from "@sentry/browser";
import { IntlProvider } from "react-intl";

import App from "./App";
import Config from "./Config";
import * as serviceWorker from "./serviceWorker";
import firebase from "./firebase";
import store from "./store";

if (Config.SENTRY_URI) {
  Sentry.init({
    dsn: Config.SENTRY_URI
  });
}

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
serviceWorker.register();
