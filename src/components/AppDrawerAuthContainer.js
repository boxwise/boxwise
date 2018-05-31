import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import AppDrawerAuth from "./AppDrawerAuth";
import firebase from "../firebase";

const enhance = compose(
  connect(state => ({
    profile: state.profile,
    user: state.user
  }))
);

const AppDrawerAuthContainer = ({ onClose, organization, user, profile }) => {
  if (user.isEmpty || profile.isEmpty) {
    return <AppDrawerAuth isFetching={true} />;
  }

  return (
    <AppDrawerAuth
      user={user}
      profile={profile}
      onSignOut={() => firebase.auth().signOut()}
      onClose={onClose}
    />
  );
};

AppDrawerAuthContainer.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default enhance(AppDrawerAuthContainer);
