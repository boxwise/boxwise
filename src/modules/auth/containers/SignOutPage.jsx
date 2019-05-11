import { useEffect } from "react";
import { connect } from "react-redux";

import { firebaseSignOut } from "../actions";

export const SignOutPage = ({ firebaseSignOut }) => {
  useEffect(() => {
    firebaseSignOut();
  });

  return null;
};

export default connect(
  null,
  { firebaseSignOut }
)(SignOutPage);
