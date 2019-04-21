import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

import { captureException } from "errorHandling";
import Progress from "components/Progress";

import { getOrAddInvite, createInviteLink } from "../actions";

// HACK: some of our components need a profile, but there's no easy way to just
// wait for the damned thing to be ready in the redux state.
function waitForProfile(Component) {
  return function({ isLoading, ...props }) {
    if (!props.profile.data || props.profile.loading) {
      return <Progress />;
    }
    return <Component {...props} />;
  };
}

class InviteLink extends React.Component {
  state = {
    snackbarOpen: false,
    isFetching: true,
    inviteLink: null
  };

  componentDidMount() {
    getOrAddInvite(this.props.profile.data.organization.ref)
      .then(invite => {
        this.setState({
          isFetching: false,
          inviteLink: createInviteLink(invite)
        });
      })
      .catch(captureException); // TODO: actually handle errors
  }

  render() {
    const { extra } = this.props;
    const { inviteLink, isFetching, snackbarOpen } = this.state;

    if (isFetching) {
      return <Progress />;
    }
    return (
      <div>
        <Typography gutterBottom>
          To invite people to your organization, send them this link:
        </Typography>
        <TextField value={inviteLink} fullWidth margin="normal" />
        <CopyToClipboard
          text={inviteLink}
          onCopy={() => this.setState({ snackbarOpen: true })}
        >
          <Button color="primary">Copy to clipboard</Button>
        </CopyToClipboard>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => {
            this.setState({ snackbarOpen: false });
          }}
          message="Link copied!"
        />
        {extra}
      </div>
    );
  }
}
export default compose(
  connect(state => ({
    profile: state.profile
  })),
  waitForProfile
)(InviteLink);
