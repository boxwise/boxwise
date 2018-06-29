import { QR_CODE_READ } from "../actions";

export default function qrcode(state = { current: null }, { type, payload }) {
  switch (type) {
    case QR_CODE_READ:
      return { ...state, current: payload };

    default:
      return state;
  }
}
