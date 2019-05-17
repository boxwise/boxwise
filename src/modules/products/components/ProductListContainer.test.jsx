import React from "react";

import { render, wait } from "reactTestingHelpers";

import ProductList from "./ProductListContainer";

jest.mock("modules/products/api", () => ({
  getAllProducts: async () => [{ id: "abc", name: "hello" }]
}));

describe("ProductsPageContainer", () => {
  it("renders correctly with a simple list", async () => {
    const { container, store } = render(<ProductList />);

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
