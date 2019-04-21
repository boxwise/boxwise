import * as Sentry from "@sentry/browser";

export function captureException(error, errorInfo) {
  console.error(error);
  Sentry.captureException(error, { extra: errorInfo });
}
