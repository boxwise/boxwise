export const SET_ORGANISATION = "SET_ORGANISATION";

export const setOrganization = organizationId => {
  return { type: SET_ORGANISATION, organizationId: organizationId };
};
