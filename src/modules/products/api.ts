import { firebase, db } from "firebaseFactory";
import { Flavor } from "typeScriptExtensions";
import {
  GetCurrentUser,
  OrganizationRef,
  UserProfileRef
} from "modules/auth/api";

export type ProductId = Flavor<string, "Product">;

export interface Product {
  id: ProductId;
  name: string;
  category: string;
  organizationId: OrganizationRef;
  createdAt: string;
  createdById: UserProfileRef;
  isDeleted: boolean;
}

const getProductFromData = (
  doc: firebase.firestore.DocumentSnapshot
): Product => {
  const data = doc.data();
  if (!data) throw new Error(`No data available on ${doc.ref}`);
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

export const getAllProducts = async (
  getCurrentUser: GetCurrentUser
): Promise<Product[]> => {
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

export const addProduct = async (
  product: {
    name: string;
    category: string;
  },
  getCurrentUser: GetCurrentUser
): Promise<Product> => {
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

export const updateProduct = (product: Product): Promise<Product> => {
  const ref = db.collection("products").doc(product.id);

  return ref
    .update(product)
    .then(() => ref.get())
    .then(getProductFromData);
};

export const deleteProduct = (productId: ProductId): Promise<void> => {
  return db
    .collection("products")
    .doc(productId)
    .update({ isDeleted: true });
};
