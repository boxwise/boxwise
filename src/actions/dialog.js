export const OPEN_DIALOG = "OPEN_DIALOG";
export const CLOSE_DIALOG = "CLOSE_DIALOG";

export const openDialog = dialog => dispatch =>
  dispatch({ type: OPEN_DIALOG, payload: dialog });
export const closeDialog = dialog => dispatch =>
  dispatch({ type: CLOSE_DIALOG });
