import React from "react";
import { shallow } from "enzyme";

import { CreateOrganizationPage } from "./CreateOrganizationPage";

it("renders correctly", () => {
  const wrapper = shallow(
    <CreateOrganizationPage classes={{ titleText: "styles" }} history={[]} />
  );
  expect(wrapper).toMatchSnapshot();
});
