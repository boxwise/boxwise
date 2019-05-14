import React from "react";

import { render, fireEvent, typeText } from "reactTestingHelpers";

import ResetPassword from "./ResetPasswordForm";

describe("ResetPasswordForm", () => {
  let container;
  let getByTestId;

  const handler = jest.fn(() => Promise.resolve());
  const clickSubmit = () => fireEvent.click(getByTestId("resetPasswordButton"));
  const enterEmailAddress = text => typeText(getByTestId("email"), text);

  beforeEach(() => {
    ({ container, getByTestId } = render(
      <ResetPassword resetPassword={handler} />
    ));
  });

  it("does not trigger resetPassword when email is not provided", () => {
    enterEmailAddress("xyz");
    expect(getByTestId("email").value).toEqual("xyz");
    expect(container).toMatchSnapshot();
    expect(handler).not.toBeCalled();
  });

  it("triggers resetPassword when email is provided", async () => {
    enterEmailAddress("test@example.com");
    clickSubmit();

    expect(container).toMatchSnapshot();
    expect(handler).toBeCalledWith({
      email: "test@example.com"
    });
  });

  it("renders correctly", () => {
    expect(container).toMatchSnapshot();
  });
});
