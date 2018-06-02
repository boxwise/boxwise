import React from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      prevProps.location &&
      this.props.location !== prevProps.location &&
      !(
        this.props.location.state &&
        this.props.location.state.resetScroll === false
      )
    ) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
