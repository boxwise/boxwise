import React from "react";

import { render } from "reactTestingHelpers";

import { CreateOrganizationPage } from "./CreateOrganizationPage";

it("renders correctly", () => {
  const { container } = render(<CreateOrganizationPage />);
  expect(container).toMatchSnapshot();
});
