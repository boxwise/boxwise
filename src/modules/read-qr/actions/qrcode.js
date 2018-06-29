import { QR_CODE_READ } from ".";
import { firestore } from "../../../firebase";

//FIXME: This should be a thunk inside box actions
export const findBoxByQr = code => (dispatch, getState) => {
  const { organization } = getState().profile.data;

  return firestore
    .collection("boxes")
    .where("organization", "==", firestore.doc(organization.ref))
    .where("qrcode", "==", code)
    .get()
    .then(
      ({ size, docs }) =>
        size === 0 ? null : { id: docs[0].id, ...docs[0].data() }
    );
};

export const qrCodeRead = code => dispatch => {
  dispatch({ type: QR_CODE_READ.START, payload: code });
  dispatch(findBoxByQr(code)).then(res => {
    dispatch({ type: QR_CODE_READ.SUCCESS, payload: res });
  });
};
