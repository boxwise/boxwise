import React from "react";
import Raven from "raven-js";
import CircularProgress from "@material-ui/core/CircularProgress";

// HACK: some of our components need a profile, but there's no easy way to just
// wait for the damned thing to be ready in the redux state.
export function waitForProfile(Component) {
  return function({ isLoading, ...props }) {
    if (!props.profile.data || props.profile.isFetching) {
      return <CircularProgress />;
    }
    return <Component {...props} />;
  };
}

export const handleError = (error, errorInfo) => {
  console.error(error);
  Raven.captureException(error, { extra: errorInfo });
};
