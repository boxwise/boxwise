import React from "react";

import { render } from "reactTestingHelpers";

import ProductList from "./ProductListContainer";

describe("ProductsPageContainer", () => {
  it("renders correctly with a simple list", () => {
    const { container } = render(<ProductList />, {
      initialState: {
        products: {
          allIds: ["abc"],
          byId: {
            abc: { id: "abc", name: "hello" }
          }
        }
      }
    });
    expect(container).toMatchSnapshot();
  });
  // TODO: more tests, yes I know...
});
