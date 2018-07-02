import React from "react";
import { mount } from "enzyme";
import SignInFormUnconnected from "./SignInForm";

describe("SignInForm", () => {
  let component;
  const userSignIn = jest.fn(({ email, password }) => {
    Promise.resolve();
  });
  beforeEach(() => {
    component = mount(<SignInFormUnconnected userSignIn={userSignIn} />);
  });
  it("signs in user when form is submitted", () => {
    component.find("input[name='email']").simulate("change", {
      target: { name: "email", value: "test@example.com" },
      persist: () => {}
    });
    component.find("input[name='password']").simulate("change", {
      target: { name: "password", value: "password" },
      persist: () => {}
    });
    component.find("button[type='submit']").simulate("submit");

    expect(userSignIn).toBeCalledWith(
      {
        email: "test@example.com",
        password: "password"
      },
      expect.any(Object)
    );
  });
});
