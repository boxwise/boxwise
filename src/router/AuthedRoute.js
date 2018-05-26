import React from "react";
import { connect } from "react-redux";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { Redirect, Route } from "react-router-dom";

const AuthedRoute = ({ auth, component: Component, ...rest }) => {
  if (!isLoaded(auth)) {
    return null; // TODO: loading indicator if this is slow?
  }
  const isLoggedIn = !isEmpty(auth);

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  auth: state.firebase.auth
});

// https://github.com/reduxjs/react-redux/blob/master/docs/troubleshooting.md#my-views-arent-updating-when-something-changes-outside-of-redux
export default connect(mapStateToProps, null, null, { pure: false })(
  AuthedRoute
);
