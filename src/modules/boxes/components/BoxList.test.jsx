import React from "react";

import { render, fireEvent } from "reactTestingHelpers";

import BoxList from "./BoxList";

describe("BoxList", () => {
  const emptyProducts = { data: [] };
  const emptyBoxesWithProductInfo = { loading: false, data: [] };
  const emptyFetch = () => {};

  it("renders correctly with no boxes", () => {
    const { container } = render(
      <BoxList
        products={emptyProducts}
        boxesWithProductInfo={emptyBoxesWithProductInfo}
        fetchBoxesAndProducts={emptyFetch}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders correctly with when loading", () => {
    const { container } = render(
      <BoxList
        products={emptyProducts}
        boxesWithProductInfo={{ loading: true, data: [] }}
        fetchBoxesAndProducts={emptyFetch}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders correctly when boxes present", () => {
    const boxes = [
      { id: "xx", humanId: "123", productName: "TShirt", quantity: 100 },
      { id: "xy", humanId: "456", productName: "Shorts", quantity: 29 }
    ];
    const { container } = render(
      <BoxList
        products={{ data: [] }}
        boxesWithProductInfo={{ data: boxes }}
        fetchBoxesAndProducts={emptyFetch}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders correctly when no boxes present matching filter", () => {
    const boxes = [
      {
        id: "xy",
        humanId: "xyz",
        productName: "TShirt",
        productId: "abc",
        quantity: 100
      }
    ];
    const { container, getByTestId } = render(
      <BoxList
        products={{ data: [] }}
        boxesWithProductInfo={{ data: boxes }}
        fetchBoxesAndProducts={emptyFetch}
      />
    );
    fireEvent.change(getByTestId("productsFilter"), {
      target: { value: "xyz" }
    });
    expect(container).toMatchSnapshot();
  });

  it("renders correctly when boxes match filter", () => {
    const boxes = [
      {
        id: "xy",
        humanId: "xyz",
        productName: "TShirt",
        productId: "abc",
        quantity: 100
      }
    ];
    const { container, getByTestId } = render(
      <BoxList
        products={{ data: [] }}
        boxesWithProductInfo={{ data: boxes }}
        fetchBoxesAndProducts={emptyFetch}
      />
    );
    fireEvent.change(getByTestId("productsFilter"), {
      target: { value: "abc" }
    });
    expect(container).toMatchSnapshot();
  });
});
