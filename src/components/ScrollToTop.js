import { useEffect } from "react";
import { withRouter } from "react-router-dom";

const ScrollToTop = ({ location, children }) => {
  useEffect(() => {
    if (!(location.state && location.state.resetScroll === false)) {
      window.scrollTo(0, 0);
    }
  }, ["location"]);

  return children;
};

export default withRouter(ScrollToTop);
