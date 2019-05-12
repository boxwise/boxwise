import { createReducerForIndexedState } from "redux/reducerFactory";
import {
  RootAction,
  RootState,
  BoxesState,
  ProductsState
} from "redux/storeTypes";

import { BOX_ADD, BOX_LIST } from "./actions";
import { Box } from "./api";

export interface BoxWithProductInfo extends Box {
  productName: string;
  productCategory: string;
}

function mapBoxWithProductInfo(
  products: ProductsState,
  box: Box
): BoxWithProductInfo {
  const product = products.byId[box.productId];
  return {
    ...box,
    productName: (product && product.name) || "!!!Missing product",
    productCategory: (product && product.category) || "!!!Missing product"
  };
}

export const getBoxWithProductInfoFromState = (
  { boxes, products }: RootState,
  boxId: string
): {
  loading: boolean;
  error?: string;
  data: BoxWithProductInfo | undefined;
} => {
  const isLoading = products.loading || boxes.loading;
  const data = {
    loading: isLoading,
    error: boxes.error,
    data: isLoading
      ? undefined
      : mapBoxWithProductInfo(products, boxes.byId[boxId])
  };
  return data;
};

export const getBoxesWithProductInfoFromState = ({
  boxes,
  products
}: RootState): {
  loading: boolean;
  error?: string;
  data: BoxWithProductInfo[];
} => {
  const isLoading = products.loading || boxes.loading;
  const data = {
    loading: isLoading,
    error: boxes.error,
    data: isLoading
      ? []
      : boxes.allIds.map(boxId => {
          return mapBoxWithProductInfo(products, boxes.byId[boxId]);
        })
  };
  return data;
};

const boxesIndexedStateReducer = createReducerForIndexedState<Box, BoxesState>(
  BOX_LIST,
  BOX_ADD
);

export default function boxes(
  state: BoxesState = {
    byId: {},
    allIds: [],
    loading: false,
    error: undefined
  },
  action: RootAction
) {
  const { type } = action;
  switch (type) {
    default:
      return boxesIndexedStateReducer(state, action);
  }
}
