import React from "react";
import { mount } from "enzyme";
import SignUpFormUnconnected from "./SignUpForm";

describe("SignUpForm", () => {
  const onSubmit = jest.fn(({ name, email, password }) => {
    Promise.resolve();
  });
  let component;

  beforeEach(() => {
    component = mount(<SignUpFormUnconnected onSubmit={onSubmit} />);
  });

  it("signs up users when name, email and password are provided", () => {
    component.find("input[name='name']").simulate("change", {
      target: { name: "name", value: "test" },
      persist: () => {}
    });
    component.find("input[name='email']").simulate("change", {
      target: { name: "email", value: "test@example.com" },
      persist: () => {}
    });
    component.find("input[name='password']").simulate("change", {
      target: { name: "password", value: "password" },
      persist: () => {}
    });
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
