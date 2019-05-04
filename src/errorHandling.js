import * as Sentry from "@sentry/browser";

// eslint-disable-next-line import/prefer-default-export
export function captureException(error, errorInfo) {
  // eslint-disable-next-line no-console
  console.error(error, errorInfo);
  Sentry.captureException(error, { extra: errorInfo });
}

// copied from https://github.com/captbaritone/raven-for-redux/issues/93#issuecomment-435854873
export const sentryMiddleware = store => {
  Sentry.addGlobalEventProcessor(event => {
    const state = store.getState();

    return {
      ...event,
      extra: {
        ...event.extra,
        "redux:state": state
      }
    };
  });

  return next => action => {
    Sentry.addBreadcrumb({
      category: "redux-action",
      message: action.type
    });

    return next(action);
  };
};

export const logErrorActionsAsExceptions = () => next => action => {
  if (action.type.endsWith("_ERROR")) {
    Sentry.captureException(action.payload);
  }
  return next(action);
};
