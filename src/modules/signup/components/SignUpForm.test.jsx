import React from "react";
import { act } from "react-dom/test-utils";

import { mount, setInputFieldValue } from "enzymeHelpers";

import SignUpFormUnconnected from "./SignUpForm";

describe("SignUpForm", () => {
  const onSubmit = jest.fn(() => {});
  let component;

  beforeEach(() => {
    component = mount(<SignUpFormUnconnected onSubmit={onSubmit} />);
  });

  it("does not trigger submit when name is not provided", () => {
    act(() => {
      setInputFieldValue(component, "name", "");
      setInputFieldValue(component, "email", "test@example.com");
      setInputFieldValue(component, "password", "password");

      component.find("button[type='submit']").simulate("submit");
    });

    expect(onSubmit).not.toBeCalled();
  });
  it("does not trigger submit when email is not provided", () => {
    act(() => {
      setInputFieldValue(component, "name", "test");
      setInputFieldValue(component, "email", "");
      setInputFieldValue(component, "password", "password");

      component.find("button[type='submit']").simulate("submit");
    });
    expect(onSubmit).not.toBeCalled();
  });
  it("does not trigger submit when password is not provided", () => {
    act(() => {
      setInputFieldValue(component, "name", "test");
      setInputFieldValue(component, "email", "test@example.com");
      setInputFieldValue(component, "password", "");

      component.find("button[type='submit']").simulate("submit");
    });
    expect(onSubmit).not.toBeCalled();
  });
  it("signs up users when name, email and password are provided", () => {
    act(() => {
      setInputFieldValue(component, "name", "test");
      setInputFieldValue(component, "email", "test@example.com");
      setInputFieldValue(component, "password", "password");

      component.find("button[type='submit']").simulate("submit");
    });
    expect(onSubmit).toBeCalledWith({
      name: "test",
      email: "test@example.com",
      password: "password"
    });
  });
});
