/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { Product } from "modules/products/api";
import { Box } from "modules/boxes/api";
import { User } from "modules/auth/api";

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

export interface UserState {
  hasInitialized: boolean;
  data: User | undefined;
  loading: boolean;
  error?: string;
  // hmmm
  hasTriggeredReset: boolean;
  isUpdating: boolean;
}

export interface RootState {
  products: ProductsState;
  user: UserState;
  boxes: BoxesState;
}

export type RootAction = AnyAction;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ThunkResult<R> = ThunkAction<R, RootState, null, RootAction>;
