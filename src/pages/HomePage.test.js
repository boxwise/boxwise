import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../store";
import HomePage from "./HomePage";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <HomePage />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
