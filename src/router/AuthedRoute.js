import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Progress from "../components/Progress.js";
import HomePage from "../pages/HomePage.js";

const AuthedRoute = ({
  user,
  profile,
  authedComponent: AuthedComponent,
  unauthedComponent: UnauthedComponent,
  ...rest
}) => {
  const isLoggedIn = !!user.data;
  const renderDefault = !UnauthedComponent;

  return (
    <Route
      {...rest}
      render={props =>
        // First, wait for user to load
        user.loading ? (
          <Progress />
        ) : // Are we logged in?
        isLoggedIn ? (
          // Wait for profile to load if logged in
          profile.loading ? (
            <Progress />
          ) : (
            <AuthedComponent {...props} />
          )
        ) : //Default behavior: Go to HomePage is not authed.
        renderDefault ? (
          <HomePage />
        ) : (
          <UnauthedComponent {...props} />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile
});

// https://github.com/reduxjs/react-redux/blob/master/docs/troubleshooting.md#my-views-arent-updating-when-something-changes-outside-of-redux
export default connect(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(AuthedRoute);
