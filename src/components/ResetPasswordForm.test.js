import React from "react";
import { mount } from "enzyme";

import { setInputFieldValue } from "commons/utils/test-util";

import ResetPassword from "./ResetPasswordForm";

describe("ResetPasswordForm", () => {
  const resetPassword = jest.fn(({ email }) => {
    Promise.resolve();
  });
  let component;

  beforeEach(() => {
    component = mount(<ResetPassword resetPassword={resetPassword} />);
  });

  it("does not trigger resetPassword when email is not provided", () => {
    setInputFieldValue(component, "email", "");
    component.find("button[type='submit']").simulate("submit");

    expect(resetPassword).not.toBeCalled();
  });
  it("triggers resetPassword when email is provided", () => {
    setInputFieldValue(component, "email", "test@example.com");
    component.find("button[type='submit']").simulate("submit");

    expect(resetPassword).toBeCalledWith(
      {
        email: "test@example.com"
      },
      expect.any(Object)
    );
  });
});
