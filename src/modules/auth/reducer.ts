import { RootAction, UserState } from "redux/storeTypes";

import {
  PASSWORD_EDIT,
  PASSWORD_RESET,
  USER_SIGN_IN,
  USER_SIGN_OUT
} from "./actions";

export default function user(
  state: UserState = {
    hasInitialized: false,
    loading: false,
    isUpdating: false,
    hasTriggeredReset: false,
    data: undefined,
    error: undefined
  },
  { type, payload }: RootAction
) {
  switch (type) {
    case USER_SIGN_IN.START:
      return { ...state, hasInitialized: true, error: null, loading: true };

    case USER_SIGN_IN.SUCCESS:
      return { ...state, hasInitialized: true, loading: false, data: payload };

    case USER_SIGN_IN.ERROR:
      return { ...state, hasInitialized: true, loading: false, error: payload };

    case USER_SIGN_OUT.SUCCESS:
      return { ...state, hasInitialized: true, loading: false, data: null };

    case USER_SIGN_OUT.ERROR:
      return { ...state, hasInitialized: true, loading: false, error: payload };

    case PASSWORD_RESET.START:
      return { ...state, loading: true, hasTriggeredReset: false };

    case PASSWORD_RESET.SUCCESS:
      return { ...state, loading: false, hasTriggeredReset: true };

    case PASSWORD_RESET.ERROR:
      return {
        ...state,
        loading: false,
        hasTriggeredReset: false,
        error: payload
      };

    case PASSWORD_EDIT.START:
      return { ...state, isUpdating: true, error: null };

    case PASSWORD_EDIT.SUCCESS:
      return { ...state, isUpdating: false, error: null };

    case PASSWORD_EDIT.ERROR:
      return { ...state, isUpdating: false, error: payload };

    default:
      return state;
  }
}
