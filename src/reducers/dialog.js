import { OPEN_DIALOG, CLOSE_DIALOG } from "../actions/dialog";

export const dialogReducer = (
  state = { openDialog: false },
  { type, payload }
) => {
  switch (type) {
    case OPEN_DIALOG:
      return { ...state, openDialog: payload };

    case CLOSE_DIALOG:
      return { ...state, openDialog: false };

    default:
      return state;
  }
};
