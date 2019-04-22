import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { registerAuthStateObserver } from "modules/auth/actions";
import Progress from "components/Progress";

export default function withAuthentication(Comp, FallbackComp) {
  const mapStateToProps = ({ user, profile }) => ({ user, profile });
  const mapDispatchToProps = { registerAuthStateObserver };

  class WithAuth extends PureComponent {
    componentDidMount() {
      this.props.registerAuthStateObserver();
    }

    render() {
      const {
        user,
        profile,
        registerAuthStateObserver,
        ...ownProps
      } = this.props;

      if (user.loading === false && !user.data) {
        return FallbackComp ? (
          <FallbackComp {...ownProps} />
        ) : (
          <Redirect to="/signin" />
        );
      }
      if (user.loading === null || (user.loading || profile.loading))
        return <Progress />;

      return <Comp {...ownProps} />;
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithAuth);
}
