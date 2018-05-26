export const SET_ORGANISATION = "SET_ORGANISATION";

export const setOrganisation = organisationId => {
  return { type: SET_ORGANISATION, organisationId: organisationId };
};
