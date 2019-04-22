import React, { Component } from "react";
import * as Sentry from "@sentry/browser";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, eventId: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      this.setState({ eventId: Sentry.captureException(error) });
    });
  }

  render() {
    const { error, eventId } = this.state;
    const { children } = this.props;
    if (error) {
      return (
        <p>
          Sorry, an unexpected problem occured. Please quote Sentry eventId{" "}
          {eventId}.
        </p>
      );
    }
    return children;
  }
}
