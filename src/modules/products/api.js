import { firebase, db } from "firebaseFactory";

const getProductFromData = doc => {
  const data = doc.data();
  // we don't want to just store raw firebase data in here
  // else you get a load of firebase variables in the redux store
  return {
    id: doc.id,
    name: data.name,
    category: data.category,
    organizationId: data.organization.id,
    createdAt: data.createdAt,
    createdById: data.createdBy.id,
    isDeleted: data.isDeleted
  };
};

export const getAllProducts = async getCurrentUser => {
  const { organizationRef } = await getCurrentUser();

  return db
    .collection("products")
    .where("organization", "==", db.doc(organizationRef))
    .where("isDeleted", "==", false)
    .orderBy("category", "asc")
    .orderBy("name", "asc")
    .get()
    .then(({ docs }) => {
      return docs.map(getProductFromData);
    });
};

export const addProduct = async (product, getCurrentUser) => {
  const { organizationRef, userProfileRef } = await getCurrentUser();

  const values = {
    ...product,
    organization: db.doc(organizationRef),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    createdBy: db.doc(userProfileRef),
    isDeleted: false
  };

  return db
    .collection("products")
    .add(values)
    .then(ref => ref.get())
    .then(getProductFromData);
};

export const updateProduct = product => {
  const ref = db.collection("products").doc(product.id);

  return ref
    .update(product)
    .then(() => ref.get())
    .then(getProductFromData);
};

export const deleteProduct = productId => {
  return db
    .collection("products")
    .doc(productId)
    .update({ isDeleted: true });
};
