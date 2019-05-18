import { connect } from "react-redux";

export const GoogleAnalytics = ({ userId, location }) => {
  if (window.gtag) {
    window.gtag("set", "page", location.pathname + location.search);
    window.gtag("set", "userid", userId);
    window.gtag("send", "pageview");
  }
  return null;
};

const mapStateToProps = ({ user }) => ({
  userId: user && user.data && user.data.uid
});
export default connect(mapStateToProps)(GoogleAnalytics);
