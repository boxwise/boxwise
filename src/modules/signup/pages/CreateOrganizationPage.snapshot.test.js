import React from "react";

import { shallow } from "enzymeHelpers";

import { CreateOrganizationPage } from "./CreateOrganizationPage";

it("renders correctly", () => {
  const wrapper = shallow(
    <CreateOrganizationPage classes={{ titleText: "styles" }} history={[]} />
  );
  expect(wrapper).toMatchSnapshot();
});
