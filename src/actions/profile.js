import { firestore } from "../firebase";
import { handleError } from "../utils";

export const SET_PROFILE = "SET_PROFILE";

export const setProfile = profile => {
  return { type: SET_PROFILE, profile: profile };
};

export const fetchProfile = userUID => {
  return dispatch => {
    firestore
      .collection("profiles")
      .doc(userUID)
      .get()
      .then(function(doc) {
        if (!doc.exists) {
          return dispatch(setProfile(null));
        }
        // Populate organization
        // TODO: this could be a general helper to populate objects
        let profile = doc.data();
        profile.ref = `profiles/${doc.id}`;
        profile.organization
          .get()
          .then(doc => {
            profile.organization = {
              id: doc.id,
              ref: `organizations/${doc.id}`,
              ...doc.data()
            };
            dispatch(setProfile(profile));
          })
          .catch(handleError); // TODO: proper handling
      })
      .catch(handleError); // TODO: proper handling
  };
};
