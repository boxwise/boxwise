import React from "react";
import { mount } from "enzyme";

import { setInputFieldValue } from "commons/utils/test-util";

import SignUpFormUnconnected from "./SignUpForm";

describe("SignUpForm", () => {
  const onSubmit = jest.fn(({ name, email, password }) => {
    Promise.resolve();
  });
  let component;

  beforeEach(() => {
    component = mount(<SignUpFormUnconnected onSubmit={onSubmit} />);
  });

  it("does not trigger submit when name is not provided", () => {
    setInputFieldValue(component, "name", "");
    setInputFieldValue(component, "email", "test@example.com");
    setInputFieldValue(component, "password", "password");

    component.find("button[type='submit']").simulate("submit");

    expect(onSubmit).not.toBeCalled();
  });
  it("does not trigger submit when email is not provided", () => {
    setInputFieldValue(component, "name", "test");
    setInputFieldValue(component, "email", "");
    setInputFieldValue(component, "password", "password");

    component.find("button[type='submit']").simulate("submit");

    expect(onSubmit).not.toBeCalled();
  });
  it("does not trigger submit when password is not provided", () => {
    setInputFieldValue(component, "name", "test");
    setInputFieldValue(component, "email", "test@example.com");
    setInputFieldValue(component, "password", "");

    component.find("button[type='submit']").simulate("submit");

    expect(onSubmit).not.toBeCalled();
  });
  it("signs up users when name, email and password are provided", () => {
    setInputFieldValue(component, "name", "test");
    setInputFieldValue(component, "email", "test@example.com");
    setInputFieldValue(component, "password", "password");

    component.find("button[type='submit']").simulate("submit");

    expect(onSubmit).toBeCalledWith(
      {
        name: "test",
        email: "test@example.com",
        password: "password"
      },
      expect.any(Object)
    );
  });
});
