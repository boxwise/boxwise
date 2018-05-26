import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { isEmpty, firestoreConnect } from "react-redux-firebase";
import AppDrawerAuth from "./AppDrawerAuth";

const enhance = compose(
  firestoreConnect(["organisations"]),
  connect(({ firebase, firestore, organisation }) => ({
    organisation: organisation,
    organisations: firestore.data.organisations,
    profile: firebase.profile
  }))
);

const AppDrawerAuthContainer = ({
  firebase,
  organisation,
  organisations,
  profile
}) => {
  if (isEmpty(profile)) {
    return null;
  }

  let org;
  if (isEmpty(organisations) || !organisation) {
    org = { id: "<unknown>" };
  } else {
    org = organisations[organisation];
  }

  return (
    <AppDrawerAuth
      profile={profile}
      organisation={org}
      signOut={firebase.logout}
    />
  );
};

AppDrawerAuthContainer.propTypes = {
  firebase: PropTypes.shape({
    logout: PropTypes.func.isRequired
  }),
  organisation: PropTypes.string,
  organisations: PropTypes.object,
  profile: PropTypes.object.isRequired
};

export default enhance(AppDrawerAuthContainer);
