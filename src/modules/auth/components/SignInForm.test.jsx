import React from "react";

import { render, fireEvent, typeText } from "reactTestingHelpers";

import SignInForm from "./SignInForm";

describe("SignInForm", () => {
  let container;
  let getByTestId;

  const handler = jest.fn(() => Promise.resolve());
  const clickSubmit = () => fireEvent.click(getByTestId("signInButton"));
  const enterEmailAddress = text => typeText(getByTestId("email"), text);
  const enterPassword = text => typeText(getByTestId("password"), text);

  beforeEach(() => {
    ({ container, getByTestId } = render(<SignInForm userSignIn={handler} />));
  });

  it("does not trigger submission when email is not provided", () => {
    enterPassword("passw0rd");
    expect(container).toMatchSnapshot("before submit");
    clickSubmit();

    expect(container).toMatchSnapshot("after submit");
    expect(getByTestId("password").value).toEqual("passw0rd");
    expect(handler).not.toBeCalled();
  });

  it("does not trigger submission when password is not provided", () => {
    enterEmailAddress("test@example.com");
    clickSubmit();

    expect(getByTestId("email").value).toEqual("test@example.com");
    expect(container).toMatchSnapshot();
    expect(handler).not.toBeCalled();
  });

  it("signs in user when form is submitted", () => {
    enterEmailAddress("test@example.com");
    enterPassword("passw0rd");
    expect(container).toMatchSnapshot("before submit");

    clickSubmit();

    expect(container).toMatchSnapshot("after submit");
    expect(getByTestId("email").value).toEqual("test@example.com");
    expect(getByTestId("password").value).toEqual("passw0rd");

    expect(handler).toBeCalledWith({
      email: "test@example.com",
      password: "passw0rd"
    });
  });
});
