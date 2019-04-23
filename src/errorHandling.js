import * as Sentry from "@sentry/browser";

// eslint-disable-next-line import/prefer-default-export
export function captureException(error, errorInfo) {
  // eslint-disable-next-line no-console
  console.error(error);
  Sentry.captureException(error, { extra: errorInfo });
}
