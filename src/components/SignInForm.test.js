import React from "react";
import { mount } from "enzyme";
import { SignInFormUnconnected } from "./SignInForm";

describe("SignInForm", () => {
  it("signs in users", done => {
    const mockFirebase = {
      login: jest.fn(() => Promise.resolve({ email: "test@example.com" }))
    };
    const component = mount(
      <SignInFormUnconnected
        firebase={mockFirebase}
        onSuccess={user => {
          expect(mockFirebase.login).toBeCalledWith({
            email: "test@example.com",
            password: "password"
          });
          expect(user.email).toEqual("test@example.com");
          done();
        }}
      />
    );

    component.find("input[name='email']").simulate("change", {
      target: { name: "email", value: "test@example.com" },
      persist: () => {}
    });
    component.find("input[name='password']").simulate("change", {
      target: { name: "password", value: "password" },
      persist: () => {}
    });
    component.find("button[type='submit']").simulate("submit");
  });
});
