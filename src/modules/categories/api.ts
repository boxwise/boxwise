import { firebase, db } from "firebaseFactory";
import { Flavor } from "typeScriptExtensions";
import {
  GetCurrentUser,
  OrganizationRef,
  UserProfileRef
} from "modules/auth/api";

export type CategoryId = Flavor<string, "Category">;

export interface Category {
  id: CategoryId;
  name: string;
  organizationId: OrganizationRef;
  createdAt: string;
  createdById: UserProfileRef;
  isDeleted: boolean;
}

const getCategoryFromData = (
  doc: firebase.firestore.DocumentSnapshot
): Category => {
  const data = doc.data();
  if (!data) throw new Error(`No data available on ${doc.ref}`);
  // we don't want to just store raw firebase data in here
  // else you get a load of firebase variables in the redux store
  return {
    id: doc.id,
    name: data.name,
    organizationId: data.organization.id,
    createdAt: data.createdAt,
    createdById: data.createdBy.id,
    isDeleted: data.isDeleted
  };
};

export const getAllCategories = async (
  getCurrentUser: GetCurrentUser
): Promise<Category[]> => {
  const { organizationRef } = await getCurrentUser();
  return db
    .collection("categories")
    .where("organization", "==", db.doc(organizationRef))
    .where("isDeleted", "==", false)
    .orderBy("name", "asc")
    .get()
    .then(({ docs }) => {
      return docs.map(getCategoryFromData);
    });
};

export const addCategory = async (
  Category: {
    name: string;
  },
  getCurrentUser: GetCurrentUser
): Promise<Category> => {
  const { organizationRef, userProfileRef } = await getCurrentUser();

  const values = {
    ...Category,
    organization: db.doc(organizationRef),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    createdBy: db.doc(userProfileRef),
    isDeleted: false
  };

  return db
    .collection("categories")
    .add(values)
    .then(ref => ref.get())
    .then(getCategoryFromData);
};

export const updateCategory = (Category: Category): Promise<Category> => {
  const ref = db.collection("categories").doc(Category.id);

  return ref
    .update(Category)
    .then(() => ref.get())
    .then(getCategoryFromData);
};

export const deleteCategory = (CategoryId: CategoryId): Promise<void> => {
  return db
    .collection("categories")
    .doc(CategoryId)
    .update({ isDeleted: true });
};
