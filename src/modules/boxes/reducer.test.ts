/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */

import { RootState, BoxesState, ProductsState } from "redux/storeTypes";
import { CATEGORY_ADULT } from "modules/products/categories";
import { Product } from "modules/products/api";

import { Box } from "./api";
import { getBoxesWithProductInfoFromState } from "./reducer";

// firebase mock doesn't support querying by reference
describe("getBoxesWithProductInfoFromState", () => {
  const boxes: Partial<BoxesState> = {
    allIds: ["123", "456"],
    byId: {
      "123": {
        id: "123",
        productId: "AdultShorts",
        quantity: 100,
        humanId: "213"
      } as Box,
      "456": {
        id: "456",
        productId: "AdultTShirt",
        quantity: 50,
        humanId: "213"
      } as Box
    }
  };

  const products: Partial<ProductsState> = {
    byId: {
      AdultTShirt: {
        name: "Adult T-Shirts",
        category: CATEGORY_ADULT
      } as Product,
      AdultShorts: { name: "Adult Shorts", category: CATEGORY_ADULT } as Product
    }
  };

  const result = getBoxesWithProductInfoFromState({
    boxes,
    products
  } as RootState);

  it("should join boxes with products", () => {
    expect(result.data).toHaveLength(2);
    expect(result.data[0].productCategory).toEqual(
      products!.byId!.AdultTShirt.category
    );
  });

  it("should have consistent properties", () => {
    expect(result).toMatchSnapshot();
  });
});
