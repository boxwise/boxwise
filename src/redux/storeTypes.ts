/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { Product } from "modules/products/api";
import { Category } from "modules/categories/api";
import { Box } from "modules/boxes/api";
import { User } from "modules/auth/api";

import { IndexedState } from "./reducerFactory";

export interface ProductsState extends IndexedState<Product> {
  byId: { [id: string]: Product };
  allIds: string[];
  loading: boolean;
  error?: string;
}

export interface CategoriesState extends IndexedState<Category> {
  byId: { [id: string]: Category };
  allIds: string[];
  loading: boolean;
  error?: string;
}

export interface BoxesState extends IndexedState<Box> {
  loading: boolean;
  error?: string;
  byId: { [id: string]: Box };
  allIds: string[];
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
  categories: CategoriesState;
  user: UserState;
  boxes: BoxesState;
}

export type RootAction = AnyAction;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ThunkResult<R> = ThunkAction<R, RootState, null, RootAction>;
