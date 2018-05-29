import { actionTypes } from "react-redux-firebase";
import { SET_ORGANISATION } from "../actions/organisations";

const initialState = null;

export const organisationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORGANISATION:
      return action.organisationId;
    // set default organisation
    case actionTypes.SET_PROFILE:
      if (
        !state &&
        action.profile &&
        action.profile.organisations &&
        action.profile.organisations.length
      ) {
        return action.profile.organisations[0].id;
      }
      return state;
    default:
      return state;
  }
};
