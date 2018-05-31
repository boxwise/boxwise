import React from "react";

// HACK: some of our components need a profile, but there's no easy way to just
// wait for the damned thing to be ready in the redux state.
export function waitForProfile(WrappedComponent) {
  return class extends React.Component {
    render() {
      if (this.props.profile.isFetching) {
        return null;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
}
