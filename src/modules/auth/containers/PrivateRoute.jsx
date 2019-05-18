import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import LoadingPage from "../pages/LoadingPage";

const mapStateToProps = ({ user }) => ({ user });

export const PrivateRoute = ({ user, component: Component, ...props }) => {
  const isSigningIn = user.loading || !user.hasInitialized;
  const isNotSignedIn = !user.data;
  // returning seperate routes based on auth state, rather than returning
  // a single route and switching on the inner component as this seemed
  // to cause the  entire application to re-mount whenever the 'user'
  // state changes (so you'd lose state of forms)
  // TODO: write test on this for change password?
  if (isSigningIn) return <Route component={LoadingPage} {...props} />;
  if (isNotSignedIn)
    return <Route component={() => <Redirect to="/signin" />} {...props} />;
  return <Route component={Component} {...props} />;
};

export default connect(mapStateToProps)(PrivateRoute);
