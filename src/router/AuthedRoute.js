import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const AuthedRoute = ({ user, profile, component: Component, ...rest }) => {
  const isLoggedIn = !!user.data;

  return (
    <Route
      {...rest}
      render={props =>
        // First, wait for user to load
        user.isFetching ? (
          <CircularProgress />
        ) : // Are we logged in?
        isLoggedIn ? (
          // Wait for profile to load if logged in
          profile.isFetching ? (
            <CircularProgress />
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{ pathname: "/home", state: { from: props.location } }}
          />
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
