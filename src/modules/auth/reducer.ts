import { RootAction, RootState } from "redux/storeTypes";

import {
  PASSWORD_EDIT,
  PASSWORD_RESET,
  USER_SIGN_IN,
  USER_SIGN_OUT
} from "./actions";

export type GetCurrentUser = () => {
  organizationRef: string;
  userProfileRef: string;
};

export const getCurrentUserFromState = (getState: () => RootState) => () => {
  const { profile } = getState();
  return {
    organizationRef: profile.data.organization.ref,
    userProfileRef: profile.data.ref
  };
};

export default function user(
  state = {
    loading: true,
    hasTriggeredReset: false,
    data: null,
    error: null
  },
  { type, payload }: RootAction
) {
  switch (type) {
    case USER_SIGN_IN.START:
      return { ...state, error: null, loading: true };

    case USER_SIGN_IN.SUCCESS:
      return { ...state, loading: false, data: payload };

    case USER_SIGN_IN.ERROR:
      return { ...state, loading: false, error: payload };

    case USER_SIGN_OUT:
      return { ...state, loading: false, data: null };

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
