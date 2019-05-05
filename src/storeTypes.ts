/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

export interface ProductsState {
  byId: any;
  allIds: string[];
  loading: boolean;
  error?: string;
  isDeletingId?: string;
}

export interface RootState {
  profile: any;
  products: ProductsState;
  user: any;
  boxes: any;
}

export type RootAction = AnyAction;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ThunkResult<R> = ThunkAction<R, RootState, null, RootAction>;
