import React from "react";

import { render, wait } from "reactTestingHelpers";

import CategoryList from "./CategoryListContainer";

jest.mock("modules/categories/api", () => ({
  getAllCategories: async () => [{ id: "abc", name: "hello" }]
}));

describe("CategoriesPageContainer", () => {
  it("renders correctly with a simple list", async () => {
    const { container, store } = render(<CategoryList />);

    expect(container).toMatchSnapshot("loading data");
    expect(JSON.stringify(store.getState(), null, 2)).toMatchSnapshot(
      "store loading data"
    );

    await wait();

    expect(container).toMatchSnapshot("loaded data");
    expect(JSON.stringify(store.getState(), null, 2)).toMatchSnapshot(
      "store loaded data"
    );
  });
  // TODO: more tests, yes I know...
});
