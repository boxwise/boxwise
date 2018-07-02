import { QR_CODE_READ, TOGGLE_ADD_BOX_DIALOG } from ".";
import { firestore } from "../../../firebase";

export const toggleBoxDialog = open => ({
  type: TOGGLE_ADD_BOX_DIALOG,
  payload: open
});

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
  dispatch(findBoxByQr(code)).then(
    res =>
      res
        ? dispatch({ type: QR_CODE_READ.SUCCESS, payload: res })
        : dispatch({ type: TOGGLE_ADD_BOX_DIALOG, payload: true })
  );
};
