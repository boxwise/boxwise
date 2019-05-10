import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { registerAuthStateObserver } from "modules/auth/actions";
import Progress from "components/Progress";

export default function withAuthentication(Comp) {
  const mapStateToProps = ({ user, profile }) => ({ user, profile });
  const mapDispatchToProps = { registerAuthStateObserver };

  const WithAuth = ({
    user,
    profile,
    registerAuthStateObserver,
    ...ownProps
  }) => {
    useEffect(() => {
      registerAuthStateObserver();
    }, [registerAuthStateObserver]);

    if (user.loading === false && !user.data) {
      return <Redirect to="/signin" />;
    }

    if (user.loading || profile.loading) return <Progress />;

    return <Comp {...ownProps} />;
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithAuth);
}
