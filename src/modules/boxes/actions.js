import firebase from "firebase/app";

import { captureException } from "errorHandling";

const BOX_ADD_ = TYPE => `BOX_ADD_${TYPE}`;
export const BOX_ADD_START = BOX_ADD_`START`;
export const BOX_ADD_SUCCESS = BOX_ADD_`SUCCESS`;
export const BOX_ADD_ERROR = BOX_ADD_`ERROR`;

const db = firebase.firestore();

export const addBox = ({
  product,
  profile,
  organization,
  quantity,
  comment
}) => dispatch => {
  dispatch({ type: BOX_ADD_START });
  const box = {
    quantity,
    comment,
    organization: db.doc(organization.ref),
    product: db.doc("products/" + product.id),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    createdBy: db.doc(profile.ref),
    humanID: Math.floor(Math.random() * 1000000)
  };

  return db
    .collection("boxes")
    .add(box)
    .then(ref => ref.get())
    .then(box => box.data())
    .then(box => {
      dispatch({ type: BOX_ADD_SUCCESS, payload: box });
      return { error: false, data: box };
    })
    .catch(error => {
      captureException(error);
      dispatch({ type: BOX_ADD_ERROR, payload: error });
      return { error };
    });
};
