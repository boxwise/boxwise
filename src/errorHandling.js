import * as Sentry from "@sentry/browser";

// eslint-disable-next-line import/prefer-default-export
export function captureException(error, errorInfo) {
  // eslint-disable-next-line no-console
  console.error(error);
  Sentry.captureException(error, { extra: errorInfo });
}

export const logErrorActionsAsExceptions = () => next => action => {
  if (action.type.endsWith("_ERROR")) {
    Sentry.captureException(action.payload);
  }
  return next(action);
};
