import { RootAction, RootState, BoxesState } from "redux/storeTypes";
import { createReducerForIndexedState } from "redux/reducerFactory";

import { BOX_ADD, BOX_LIST } from "./actions";
import { Box } from "./api";

export interface BoxWithProductInfo extends Box {
  productName: string;
  productCategory: string;
}

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
          const box = boxes.byId[boxId];
          const product = products.byId[box.productId];
          return {
            ...box,
            productName: (product && product.name) || "!!!Missing product",
            productCategory:
              (product && product.category) || "!!!Missing product"
          };
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
