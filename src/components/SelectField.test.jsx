import React from "react";

import { render, fireEvent } from "reactTestingHelpers";

import SelectField from "./SelectField";

describe("BoxList", () => {
  it("renders correctly with no items", () => {
    const { container } = render(
      <SelectField name="SomeField" label="Some Field" items={[]} />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders correctly with items", () => {
    const { container } = render(
      <SelectField
        name="SomeField"
        label="Some Field"
        items={[{ id: "123", text: "Hello" }]}
        itemToId={({ id }) => id}
        itemToText={({ id, text }) => `${id}: ${text}`}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("triggers onChange", () => {
    const { container, getByTestId } = render(
      <SelectField
        name="SomeField"
        label="Some Field"
        items={[{ id: "123", text: "Hello" }]}
        itemToId={({ id }) => id}
        itemToText={({ id, text }) => `${id}: ${text}`}
        dataTestId="filter"
      />
    );
    fireEvent.change(getByTestId("filter"), { target: { value: "xyz" } });
    expect(container).toMatchSnapshot();
  });
});
