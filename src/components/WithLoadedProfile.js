import React from "react";
import { connect } from "react-redux";

const WithLoadedProfile = ({ profile, children }) => {
  if (profile.isFetching) {
    return <CircularProgress />;
  }
  return children;
};

export default connect(state => ({
  profile: state.profile
}))(WithLoadedProfile);
