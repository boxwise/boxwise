import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { FirestoreProvider } from "react-firestore";
import * as Sentry from "@sentry/browser";
import { IntlProvider } from "react-intl";

import App from "./App";
import config from "./config";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import { firebase } from "./firebaseFactory";

if (config.SENTRY_URI) {
  Sentry.init({
    dsn: config.SENTRY_URI
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
