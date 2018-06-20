import React from "react";
import Raven from "raven-js";
import Progress from "./components/Progress.js";

// HACK: some of our components need a profile, but there's no easy way to just
// wait for the damned thing to be ready in the redux state.
export function waitForProfile(Component) {
  return function({ isLoading, ...props }) {
    if (!props.profile.data || props.profile.loading) {
      return <Progress />;
    }
    return <Component {...props} />;
  };
}

export const handleError = (error, errorInfo) => {
  console.error(error);
  Raven.captureException(error, { extra: errorInfo });
};
