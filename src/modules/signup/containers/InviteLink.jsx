import React, { useState, useEffect } from "react";
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

// HACK: some of our components need a profile, but there's no easy way to just
// wait for the damned thing to be ready in the redux state.
function waitForProfile(Component) {
  return ({ isLoading, ...props }) => {
    const { profile } = props;
    if (!profile.data || profile.loading) {
      return <Progress />;
    }
    return <Component {...props} />;
  };
}

const InviteLink = ({ profile, extra }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [inviteData, setInviteData] = useState({
    isFetching: true,
    inviteLink: null
  });

  useEffect(() => {
    getOrAddInvite(profile.data.organization.ref)
      .then(invite => {
        setInviteData({
          isFetching: false,
          inviteLink: createInviteLink(invite)
        });
      })
      .catch(captureException); // TODO: actually handle errors
  }, [profile.data.organization.ref, setInviteData]);

  if (inviteData.isFetching) {
    return <Progress />;
  }
  return (
    <div>
      <Typography gutterBottom>
        To invite people to your organization, send them this link:
      </Typography>
      <TextField value={inviteData.inviteLink} fullWidth margin="normal" />
      <CopyToClipboard
        text={inviteData.inviteLink}
        onCopy={() => setSnackbarOpen(true)}
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
        onClose={() => setSnackbarOpen(false)}
        message="Link copied!"
      />
      {extra}
    </div>
  );
};

export default compose(
  connect(state => ({
    profile: state.profile
  })),
  waitForProfile
)(InviteLink);
