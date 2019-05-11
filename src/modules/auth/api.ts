/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { firebase, db } from "firebaseFactory";
import { Flavor } from "typeScriptExtensions";

export type GetCurrentUser = () => Promise<User>;

export type OrganizationRef = Flavor<string, "Organization">;
export type UserProfileRef = Flavor<string, "UserProfile">;

export interface User {
  uid: string;
  userProfileRef: UserProfileRef;
  emailAddress: string;
  displayName: string;
  organizationName: string;
  organizationRef: OrganizationRef;
}

export const signOut = (): Promise<void> => {
  return firebase.auth().signOut();
};

const getUserFromData = (firebaseUser: firebase.User): Promise<User> => {
  if (!firebaseUser.email) throw new Error("User doesn't have email specified");
  // ideally we'd have all the information we need sitting on the profile
  // but for now we hide the complexity (and slow-ness) here
  return db
    .collection("profiles")
    .doc(firebaseUser.uid)
    .get()
    .then(profileDoc => {
      const profileData = profileDoc.data();
      if (!profileData) throw new Error("User doesn't have profile available");
      return profileData.organization
        .get()
        .then((orgDoc: firebase.firestore.DocumentSnapshot) => ({
          uid: firebaseUser.uid,
          emailAddress: firebaseUser.email,
          displayName: profileData.name,
          userProfileRef: `profiles/${profileDoc.id}`,
          organizationName: orgDoc.data()!.name,
          organizationRef: `organizations/${orgDoc.id}`
        }));
    });
};

export const signIn = (email: string, password: string): Promise<void> => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(credential => Promise.resolve());
};

export const sendPasswordResetEmail = (email: string): Promise<void> => {
  return firebase.auth().sendPasswordResetEmail(email);
};

export const changePassword = async (
  getCurrentUser: GetCurrentUser,
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  const { emailAddress } = await getCurrentUser();
  return firebase
    .auth()
    .signInWithEmailAndPassword(emailAddress, currentPassword)
    .then(({ user }) => user!.updatePassword(newPassword));
};

export const observeAuthState = (
  onSignOut: () => void,
  onSignIn: (getUserProfile: () => Promise<User>) => void
) => {
  return firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      onSignOut();
    } else {
      onSignIn(() => getUserFromData(user));
    }
  });
};
