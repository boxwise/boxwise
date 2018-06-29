import { QR_CODE_READ } from "../actions";

export default function qrcode(
  state = { current: null, box: null },
  { type, payload }
) {
  switch (type) {
    case QR_CODE_READ.START:
      return { ...state, current: payload };

    case QR_CODE_READ.SUCCESS:
      return { ...state, box: payload };

    default:
      return state;
  }
}
