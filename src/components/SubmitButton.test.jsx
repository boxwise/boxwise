import React from "react";

import { render } from "reactTestingHelpers";

import SubmitButton from "./SubmitButton";

describe("<SubmitButton />", () => {
  it("renders correctly", () => {
    const { container } = render(
      <SubmitButton isSubmitting={false}>Hello</SubmitButton>
    );
    expect(container).toMatchSnapshot();
  });

  it("renders correctly when submitting", () => {
    const { container } = render(
      <SubmitButton isSubmitting>Hello</SubmitButton>
    );
    expect(container).toMatchSnapshot("submitting");
  });

  it("renders correctly when in dialog", () => {
    const { container } = render(<SubmitButton isInDialog>Hello</SubmitButton>);
    expect(container).toMatchSnapshot("dialog");
  });
});
