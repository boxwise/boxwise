import { RootAction, RootState, BoxesState } from "redux/storeTypes";

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
      : boxes.data.map(box => {
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

export default function boxes(
  state: BoxesState = { data: [], loading: false, error: undefined },
  { type, payload }: RootAction
) {
  switch (type) {
    case BOX_LIST.START:
      return { ...state, loading: true };
    case BOX_LIST.SUCCESS:
      return { ...state, loading: false, data: payload };
    case BOX_LIST.ERROR:
      return { ...state, loading: false, error: payload };
    case BOX_ADD.START:
      return { ...state, loading: true };

    case BOX_ADD.SUCCESS:
      return { ...state, loading: false, data: [...state.data, payload] };

    case BOX_ADD.ERROR:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}
