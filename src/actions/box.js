import firebase, { firestore } from "../firebase";
import { handleError } from "../utils";

const BOX_ADD_ = TYPE => `BOX_ADD_${TYPE}`;
export const BOX_ADD_START = BOX_ADD_`START`;
export const BOX_ADD_SUCCESS = BOX_ADD_`SUCCESS`;
export const BOX_ADD_ERROR = BOX_ADD_`ERROR`;

export const addBox = ({
  qrcode,
  product,
  profile,
  organization,
  quantity,
  comment
}) => dispatch => {
  dispatch({ type: BOX_ADD_START });
  const box = {
    qrcode,
    quantity,
    comment,
    organization: firestore.doc(organization.ref),
    product: firestore.doc("products/" + product.id),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    createdBy: firestore.doc(profile.ref),
    humanID: Math.floor(Math.random() * 1000000)
  };

  return firestore
    .collection("boxes")
    .add(box)
    .then(ref => ref.get())
    .then(box => box.data())
    .then(box => {
      dispatch({ type: BOX_ADD_SUCCESS, payload: box });
      return { error: false, data: box };
    })
    .catch(error => {
      handleError(error);
      dispatch({ type: BOX_ADD_ERROR, payload: error });
      return { error };
    });
};
