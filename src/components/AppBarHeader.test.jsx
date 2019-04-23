import React from "react";

import { shallow } from "enzymeHelpers";

import { AppBarHeader } from "./AppBarHeader";

describe("<AppBarHeader />", () => {
  it("renders correctly", () => {
    const component = shallow(
      <AppBarHeader title="Hello" backUrl="/dummy" classes="{}" />
    );
    expect(component).toMatchSnapshot();
  });
});
