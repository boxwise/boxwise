import React from "react";
import { render, fireEvent } from "react-testing-library";

import { PasswordChangeForm } from "./PasswordChangeForm";

const typeText = (element, value) => {
  fireEvent.change(element, { target: { value } });
};

describe("PasswordChangeForm", () => {
  let container;
  let getByTestId;

  const handler = jest.fn(() => Promise.resolve());
  const clickSubmit = () =>
    fireEvent.click(getByTestId("updatePasswordButton"));
  const enterCurrentPassword = text =>
    typeText(getByTestId("currentPassword"), text);
  const enterNewPassword = text => typeText(getByTestId("newPassword"), text);
  const enterConfirmedPassword = text =>
    typeText(getByTestId("confirmedPassword"), text);

  beforeEach(() => {
    ({ container, getByTestId } = render(
      <PasswordChangeForm userPasswordChange={handler} />
    ));
  });

  it("does not submit when password is not provided", () => {
    enterCurrentPassword("xx");

    clickSubmit();

    expect(container).toMatchSnapshot();
    expect(handler).not.toBeCalled();
  });

  it("submits when password is provided at least 6 characters", () => {
    typeText(getByTestId("currentPassword"), "hellooooooooo");
    enterCurrentPassword("abc");
    enterNewPassword("xyzxyz9");
    enterConfirmedPassword("xyzxyz9");

    expect(container).toMatchSnapshot("before submit");

    clickSubmit();

    expect(container).toMatchSnapshot("after submit");
    expect(handler).toBeCalledWith({
      currentPassword: "abc",
      confirmedPassword: "xyzxyz9",
      newPassword: "xyzxyz9"
    });
  });

  it("renders correctly", () => {
    expect(container).toMatchSnapshot();
  });
});
