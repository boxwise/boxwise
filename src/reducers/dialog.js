import { OPEN_DIALOG } from "../actions/dialog";

export const dialogReducer = (
  state = { openDialog: false },
  { type, payload }
) => {
  switch (type) {
    case OPEN_DIALOG:
      return { ...state, openDialog: payload };

    default:
      return state;
  }
};
