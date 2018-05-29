import React from "react";
import { mount } from "enzyme";
import { SignUpFormUnconnected } from "./SignUpForm";

describe("SignUpForm", () => {
  // skip: hack in form to add users to org
  it.skip("signs up users", done => {
    const mockFirebase = {
      createUser: jest.fn(() => Promise.resolve({ email: "test@example.com" }))
    };
    const component = mount(
      <SignUpFormUnconnected
        firebase={mockFirebase}
        onSuccess={user => {
          expect(mockFirebase.createUser).toBeCalledWith({
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
