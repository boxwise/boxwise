import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import store from "../store";
import { mount } from "enzyme";
import SignUpForm from "./SignUpForm";
import { Provider } from "react-redux";
import firebase from "../firebase"; // mock

describe("SignUpForm", () => {
  it("signs up users", done => {
    const component = mount(
      <Provider store={store}>
        <SignUpForm
          store={store}
          onSuccess={user => {
            firebase
              .auth()
              .getUserByEmail("test@example.com")
              .then(function(user) {
                expect(user.email).toEqual("test@example.com");
                done();
              });
          }}
        />
      </Provider>
    );
    component.find("input[name='email']").simulate("change", {
      target: { name: "email", value: "test@example.com" },
      persist: () => {}
    });
    component.find("input[name='password']").simulate("change", {
      target: { name: "password", value: "password" },
      persist: () => {}
    });
    component.find("button[type='submit']").simulate("submit");
  });
});
