import React from "react";

import { render, fireEvent, typeText } from "reactTestingHelpers";

import SignUpForm from "./SignUpForm";

describe("SignUpForm", () => {
  let container;
  let getByTestId;

  const handler = jest.fn(() => Promise.resolve());
  const clickSubmit = () => fireEvent.click(getByTestId("signUpButton"));
  const enterEmail = text => typeText(getByTestId("email"), text);
  const enterPassword = text => typeText(getByTestId("password"), text);
  const enterName = text => enterName(text);

  beforeEach(() => {
    ({ container, getByTestId } = render(<SignUpForm onSubmit={handler} />));
  });

  it("does not trigger submit when name is not provided", () => {
    enterName("");
    enterEmail("test@example.com");
    enterPassword("password");

    clickSubmit();

    expect(handler).not.toBeCalled();
    expect(container).toMatchSnapshot();
  });
  it("does not trigger submit when email is not provided", () => {
    enterName("test");
    enterEmail("");
    enterPassword("password");

    clickSubmit();

    expect(handler).not.toBeCalled();
  });
  it("does not trigger submit when password is not provided", () => {
    enterName("test");
    enterEmail("test@example.com");
    enterPassword("");

    clickSubmit();

    expect(handler).not.toBeCalled();
  });
  it("signs up users when name, email and password are provided", () => {
    enterName("test");
    enterEmail("test@example.com");
    enterPassword("password");

    clickSubmit();

    expect(handler).toBeCalledWith({
      name: "test",
      email: "test@example.com",
      password: "password"
    });
  });
});
