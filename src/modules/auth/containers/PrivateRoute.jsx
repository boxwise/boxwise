import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import Progress from "components/Progress";

const mapStateToProps = ({ user }) => ({ user });

export const PrivateRoute = ({ user, component: Component, ...props }) => {
  const getComponent = () => {
    if (user.loading || !user.hasInitialized) return <Progress />;

    if (!user.data) return <Redirect to="/signin" />;

    return <Component />;
  };
  return <Route component={getComponent} {...props} />;
};

export default connect(mapStateToProps)(PrivateRoute);
