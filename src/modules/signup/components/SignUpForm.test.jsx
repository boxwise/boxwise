import React from "react";

import { render, fireEvent, typeText } from "reactTestingHelpers";

import SignUpForm from "./SignUpForm";

describe("SignUpForm", () => {
  let container;
  let getByTestId;

  const handler = jest.fn(() => Promise.resolve());
  const clickSubmit = () => fireEvent.click(getByTestId("createUserButton"));
  const enterEmail = text => typeText(getByTestId("email"), text);
  const enterPassword = text => typeText(getByTestId("password"), text);
  const enterName = text => typeText(getByTestId("name"), text);

  beforeEach(() => {
    ({ container, getByTestId } = render(<SignUpForm onSubmit={handler} />));
  });

  it("does not trigger submit when name is not provided", () => {
    enterEmail("alice@example.com");
    enterPassword("passw0rd");

    clickSubmit();

    expect(handler).not.toBeCalled();
    expect(container).toMatchSnapshot();
  });
  it("does not trigger submit when email is not provided", () => {
    enterName("alice");
    enterPassword("passw0rd");
    expect(getByTestId("name").value).toEqual("alice");

    clickSubmit();

    expect(handler).not.toBeCalled();
    expect(container).toMatchSnapshot();
  });
  it("does not trigger submit when password is not provided", () => {
    enterName("bob");
    enterEmail("bob@example.com");

    expect(getByTestId("name").value).toEqual("bob");

    clickSubmit();
    expect(container).toMatchSnapshot();
    expect(handler).not.toBeCalled();
  });
  it("signs up users when name, email and password are provided", () => {
    enterName("alice");
    enterEmail("alice@example.com");
    enterPassword("passw0rd");

    expect(getByTestId("email").value).toEqual("alice@example.com");
    expect(getByTestId("name").value).toEqual("alice");
    clickSubmit();

    expect(container).toMatchSnapshot("after submit");

    expect(handler).toBeCalledWith({
      name: "alice",
      email: "alice@example.com",
      password: "passw0rd"
    });
  });
});
