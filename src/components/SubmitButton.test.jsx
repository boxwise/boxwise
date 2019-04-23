import React from "react";
import { shallow } from "enzyme";
import Button from "@material-ui/core/Button";

import { SubmitButton } from "./SubmitButton";

describe("<SubmitButton />", () => {
  it("renders correctly", () => {
    const component = shallow(
      <SubmitButton isSubmitting={false} classes={{}}>
        Hello
      </SubmitButton>
    );
    expect(component).toMatchSnapshot();
    expect(component.find(Button).length).toBe(1);
  });

  it("renders correctly when submitting", () => {
    const component = shallow(
      <SubmitButton isSubmitting classes={{}}>
        Hello
      </SubmitButton>
    );
    expect(component).toMatchSnapshot("submitting");
  });

  it("renders correctly when in dialog", () => {
    const component = shallow(
      <SubmitButton isInDialog classes={{}}>
        Hello
      </SubmitButton>
    );
    expect(component).toMatchSnapshot("dialog");
  });
});
