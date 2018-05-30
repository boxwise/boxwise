import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { isEmpty, firestoreConnect } from "react-redux-firebase";
import AppDrawerAuth from "./AppDrawerAuth";

const enhance = compose(
  firestoreConnect(["organizations"]),
  connect(({ firebase, firestore, organization }) => ({
    organization: organization,
    organizations: firestore.data.organizations,
    profile: firebase.profile
  }))
);

const AppDrawerAuthContainer = ({
  firebase,
  organization,
  organizations,
  profile
}) => {
  if (isEmpty(profile)) {
    return null;
  }

  let org;
  if (isEmpty(organizations) || !organization) {
    org = { id: "<unknown>" };
  } else {
    org = organizations[organization];
  }

  return (
    <AppDrawerAuth
      profile={profile}
      organization={org}
      signOut={firebase.logout}
    />
  );
};

AppDrawerAuthContainer.propTypes = {
  firebase: PropTypes.shape({
    logout: PropTypes.func.isRequired
  }),
  organization: PropTypes.string,
  organizations: PropTypes.object,
  profile: PropTypes.object.isRequired
};

export default enhance(AppDrawerAuthContainer);
