import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import store from "../store";
import { mount } from "enzyme";
import SignInForm from "./SignInForm";
import { Provider } from "react-redux";
import firebase from "../firebase"; // mock

describe("SignInForm", () => {
  it("signs in users", done => {
    const component = mount(
      <Provider store={store}>
        <SignInForm
          store={store}
          onSuccess={() => {
            const user = firebase.auth().currentUser;
            expect(user.email).toEqual("test@example.com");
            expect(user.isAnonymous).toEqual(false);
            done();
          }}
        />
      </Provider>
    );

    expect(firebase.auth().currentUser).toBeNull();

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
