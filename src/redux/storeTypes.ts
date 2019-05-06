/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { Product } from "modules/products/api";
import { Box } from "modules/boxes/api";

export interface ProductsState {
  byId: { [id: string]: Product };
  allIds: string[];
  loading: boolean;
  error?: string;
  isDeletingId?: string;
}

export interface BoxesState {
  loading: boolean;
  error?: string;
  data: Box[];
}

export interface RootState {
  profile: any;
  products: ProductsState;
  user: any;
  boxes: BoxesState;
}

export type RootAction = AnyAction;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ThunkResult<R> = ThunkAction<R, RootState, null, RootAction>;
