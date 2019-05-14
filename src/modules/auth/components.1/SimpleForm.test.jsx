
import React from "react";
import { render, fireEvent, cleanup, wait, act } from "react-testing-library";

import SimpleForm from "./SimpleForm";

beforeEach(cleanup);

describe("SignInForm", () => {
  let container;
  let getByTestId;

  const handler = jest.fn(() => Promise.resolve());

  beforeEach(() => {
    act(() => {
      ({ container, getByTestId } = render(<SimpleForm userSignIn={handler} />));
    });
  });

  // the first test always fails.

  it("with only email", async () => {
    fireEvent.change(getByTestId("email"), { target: { value: "testX" } });

    fireEvent.click(getByTestId("signInButton"));

    expect(getByTestId("email").value).toEqual("testX");
  });

  it("with only password", async () => {
    fireEvent.change(getByTestId("password2"), { target: { value: "passw0rd" } });

    fireEvent.click(getByTestId("signInButton"));

    expect(getByTestId("password2").value).toEqual("passw0rd");
  });
});
