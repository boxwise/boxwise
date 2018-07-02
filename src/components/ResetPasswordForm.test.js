import React from "react";
import { mount } from "enzyme";
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
    component.find("input[name='email']").simulate("change", {
      target: { name: "email", value: "" },
      persist: () => {}
    });

    component.find("button[type='submit']").simulate("submit");

    expect(resetPassword).not.toBeCalled();
  });
  it("triggers resetPassword when email is provided", () => {
    component.find("input[name='email']").simulate("change", {
      target: { name: "email", value: "test@example.com" },
      persist: () => {}
    });

    component.find("button[type='submit']").simulate("submit");

    expect(resetPassword).toBeCalledWith(
      {
        email: "test@example.com"
      },
      expect.any(Object)
    );
  });
});
