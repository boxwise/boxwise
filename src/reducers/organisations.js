import { actionTypes } from "react-redux-firebase";
import { SET_ORGANISATION } from "../actions/organisations";

const initialState = {
  id: null
};

export const organisationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORGANISATION:
      return {
        ...state,
        id: action.organisationId
      };
    // set default organisation
    case actionTypes.SET_PROFILE:
      const organisations = action.profile.organisations;
      if (!state.organisationId && organisations && organisations.length) {
        return {
          ...state,
          id: organisations[0].id
        };
      }
      return state;
    default:
      return state;
  }
};
