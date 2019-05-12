import { firebase, db } from "firebaseFactory";
import { GetCurrentUser } from "modules/auth/api";
import { ProductId } from "modules/products/api";
import { Flavor } from "typeScriptExtensions";

export type BoxId = Flavor<string, "Box">;

export interface Box {
  id: BoxId;
  quantity: number;
  comment?: string;
  productId: string;
  organizationId: string;
  createdAt: string;
  createdById: string;
  humanId: string;
}

const getBoxFromData = (doc: firebase.firestore.DocumentSnapshot): Box => {
  const data = doc.data();
  if (!data) throw new Error(`Could not load data from ${doc.ref}`);
  // we don't want to just store raw firebase data in here
  // else you get a load of firebase variables in the redux store
  return {
    id: doc.id,
    quantity: data.quantity,
    comment: data.comment,
    productId: data.product.id,
    organizationId: data.organization.id,
    createdAt: data.createdAt,
    createdById: data.createdBy.id,
    humanId: data.humanID
  };
};

// TODO: want to subscribe to updates
export const fetchActiveBoxes = async (getCurrentUser: GetCurrentUser) => {
  const { organizationRef } = await getCurrentUser();
  // TODO: we only want to return boxes that are currently 'active'
  return db
    .collection("boxes")
    .where("organization", "==", db.doc(organizationRef))
    .orderBy("humanID", "asc")
    .get()
    .then(({ docs }) => {
      return docs.map(getBoxFromData);
    });
};

export const addBox = async (
  quantity: number,
  comment: string,
  productId: ProductId,
  getCurrentUser: GetCurrentUser
) => {
  const { organizationRef, userProfileRef } = await getCurrentUser();
  const box = {
    quantity,
    comment: comment || "",
    organization: db.doc(organizationRef),
    product: db.doc(`products/${productId}`),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    createdBy: db.doc(userProfileRef),
    humanID: Math.floor(Math.random() * 1000000)
  };

  return db
    .collection("boxes")
    .add(box)
    .then(ref => ref.get())
    .then(getBoxFromData);
};
