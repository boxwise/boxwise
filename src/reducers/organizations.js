import { actionTypes } from "react-redux-firebase";
import { SET_ORGANISATION } from "../actions/organizations";

const initialState = null;

export const organizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORGANISATION:
      return action.organizationId;
    // set default organization
    case actionTypes.SET_PROFILE:
      if (
        !state &&
        action.profile &&
        action.profile.organizations &&
        action.profile.organizations.length
      ) {
        return action.profile.organizations[0].id;
      }
      return state;
    default:
      return state;
  }
};
