import { QR_CODE_READ } from ".";

export const qrCodeRead = code => ({ type: QR_CODE_READ, payload: code });
