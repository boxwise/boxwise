import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { firebaseSignOut } from "../actions";

class SignOutPage extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(firebaseSignOut);
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default connect()(SignOutPage);
