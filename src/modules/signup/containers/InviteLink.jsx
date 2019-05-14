import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

import { captureException } from "errorHandling";
import Progress from "components/Progress";

import { getOrAddInvite, createInviteLink } from "../actions";

const InviteLink = ({ user, children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [inviteData, setInviteData] = useState({
    isFetching: true,
    inviteLink: null
  });

  useEffect(() => {
    if (user && user.data) {
      getOrAddInvite(user.data.organizationRef)
        .then(invite => {
          setInviteData({
            isFetching: false,
            inviteLink: createInviteLink(invite)
          });
        })
        .catch(captureException); // TODO: actually handle errors
    }
  }, [user, user.data]);

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
        <Button color="primary" data-testid="copyToClipboardButton">
          Copy to clipboard
        </Button>
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
      {children}
    </div>
  );
};

export default connect(({ user }) => ({ user }))(InviteLink);
