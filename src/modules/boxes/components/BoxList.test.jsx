import React from "react";

import { shallow } from "enzymeHelpers";

import { BoxList } from "./BoxList";

describe("BoxList", () => {
  const emptyProducts = { data: [] };
  const emptyBoxesWithProductInfo = { loading: false, data: [] };
  const emptyFetch = () => {};

  it("renders correctly with no boxes", () => {
    const wrapper = shallow(
      <BoxList
        classes={{ titleText: "styles" }}
        products={emptyProducts}
        boxesWithProductInfo={emptyBoxesWithProductInfo}
        fetchBoxesAndProducts={emptyFetch}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly with when loading", () => {
    const wrapper = shallow(
      <BoxList
        classes={{ titleText: "styles" }}
        products={emptyProducts}
        boxesWithProductInfo={{ loading: true, data: [] }}
        fetchBoxesAndProducts={emptyFetch}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly when boxes present", () => {
    const boxes = [
      { id: "xx", humanId: "123", productName: "TShirt", quantity: 100 },
      { id: "xy", humanId: "456", productName: "Shorts", quantity: 29 }
    ];
    const wrapper = shallow(
      <BoxList
        classes={{ titleText: "styles" }}
        products={{ data: [] }}
        boxesWithProductInfo={{ data: boxes }}
        fetchBoxesAndProducts={emptyFetch}
      />
    );
    expect(wrapper).toMatchSnapshot();
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
    const wrapper = shallow(
      <BoxList
        classes={{ titleText: "styles" }}
        products={{ data: [] }}
        boxesWithProductInfo={{ data: boxes }}
        fetchBoxesAndProducts={emptyFetch}
      />
    );
    wrapper.find("ProductSelect").simulate("change", "xyz");
    expect(wrapper).toMatchSnapshot();
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
    const wrapper = shallow(
      <BoxList
        classes={{ titleText: "styles" }}
        products={{ data: [] }}
        boxesWithProductInfo={{ data: boxes }}
        fetchBoxesAndProducts={emptyFetch}
      />
    );
    wrapper.find("ProductSelect").simulate("change", "abc");
    expect(wrapper).toMatchSnapshot();
  });
});
