import React from "react";

import { render } from "reactTestingHelpers";

import { AppBarHeader } from "./AppBarHeader";

describe("<AppBarHeader />", () => {
  it("renders correctly", () => {
    const { container } = render(
      <AppBarHeader title="Hello" backUrl="/dummy" classes="{}" />
    );
    expect(container).toMatchSnapshot();
  });
});
