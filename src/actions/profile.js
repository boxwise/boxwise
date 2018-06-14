import { firestore } from "../firebase";
import { handleError } from "../utils";

export const FETCH_PROFILE_ = TYPE => `FETCH_PROFILE_${TYPE}`;
export const FETCH_PROFILE_START = FETCH_PROFILE_`START`;
export const FETCH_PROFILE_SUCCESS = FETCH_PROFILE_`SUCCESS`;
export const FETCH_PROFILE_ERROR = FETCH_PROFILE_`ERROR`;

export const fetchProfile = userUID => dispatch => {
  firestore
    .collection("profiles")
    .doc(userUID)
    .get()
    .then(function(doc) {
      if (!doc.exists) {
        return dispatch(fetchProfile(null));
      }
      // Populate organization
      // TODO: this could be a general helper to populate objects
      let profile = doc.data();
      profile.ref = `profiles/${doc.id}`;
      return profile.organization.get().then(doc => {
        profile.organization = {
          id: doc.id,
          ref: `organizations/${doc.id}`,
          ...doc.data()
        };
        dispatch({ type: FETCH_PROFILE_SUCCESS, payload: profile });
      });
    })
    .catch(err => {
      dispatch({ type: FETCH_PROFILE_ERROR, payload: err });
      handleError(err); // TODO: proper handling
    });
};
