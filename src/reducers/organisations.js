import { actionTypes } from "react-redux-firebase";
import { SET_ORGANISATION } from "../actions/organisations";

const initialState = null;

export const organisationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORGANISATION:
      return action.organisationId;
    // set default organisation
    case actionTypes.SET_PROFILE:
      const organisations = action.profile.organisations;
      if (!state && organisations && organisations.length) {
        return organisations[0];
      }
      return state;
    default:
      return state;
  }
};
