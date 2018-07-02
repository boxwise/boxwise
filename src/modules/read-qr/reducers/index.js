import { QR_CODE_READ, TOGGLE_ADD_BOX_DIALOG } from "../actions";

export default function qrcode(
  state = { showAddBox: false, current: null, box: null },
  { type, payload }
) {
  switch (type) {
    case QR_CODE_READ.START:
      return { ...state, current: payload };

    case QR_CODE_READ.SUCCESS:
      return { ...state, box: payload };

    case TOGGLE_ADD_BOX_DIALOG:
      return { ...state, showAddBox: payload || !state.showAddBox };

    default:
      return state;
  }
}
