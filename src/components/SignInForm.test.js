import React from "react";
import { mount } from "enzyme";
import SignInFormUnconnected from "./SignInForm";
import { setInputFieldValue } from "commons/utils/test-util";

describe("SignInForm", () => {
  let component;
  const userSignIn = jest.fn(({ email, password }) => {
    Promise.resolve();
  });
  beforeEach(() => {
    component = mount(<SignInFormUnconnected userSignIn={userSignIn} />);
  });
  it("does not trigger submission when email is not provided", () => {
    setInputFieldValue(component, "email", "");
    setInputFieldValue(component, "password", "password");
    component.find("button[type='submit']").simulate("submit");

    expect(userSignIn).not.toBeCalled();
  });
  it("does not trigger submission when password is not provided", () => {
    setInputFieldValue(component, "email", "test@example.com");
    setInputFieldValue(component, "password", "");
    component.find("button[type='submit']").simulate("submit");

    expect(userSignIn).not.toBeCalled();
  });
  it("signs in user when form is submitted", () => {
    setInputFieldValue(component, "email", "test@example.com");
    setInputFieldValue(component, "password", "password");
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
