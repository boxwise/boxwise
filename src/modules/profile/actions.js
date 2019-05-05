import { db } from "firebaseFactory";
import { createAsyncAction } from "redux/actionCreators";

export const FETCH_PROFILE = createAsyncAction(
  "FETCH_PROFILE_START",
  "FETCH_PROFILE_SUCCESS",
  "FETCH_PROFILE_ERROR"
);

export const fetchProfile = userUID => dispatch => {
  dispatch({ type: FETCH_PROFILE.START, paylod: userUID });
  db.collection("profiles")
    .doc(userUID)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return dispatch(fetchProfile(null));
      }
      // Populate organization
      // TODO: this could be a general helper to populate objects
      const profile = doc.data();
      profile.ref = `profiles/${doc.id}`;
      return profile.organization.get().then(doc => {
        profile.organization = {
          id: doc.id,
          ref: `organizations/${doc.id}`,
          ...doc.data()
        };
        dispatch({ type: FETCH_PROFILE.SUCCESS, payload: profile });
      });
    })
    .catch(err => dispatch({ type: FETCH_PROFILE.ERROR, payload: err }));
};
