import React from "react";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getOrAddInvite, createInviteLink } from "../queries/invites";

class InviteLink extends React.Component {
  state = {
    snackbarOpen: false,
    isFetching: true,
    inviteLink: null
  };

  componentDidMount() {
    getOrAddInvite(this.props.profile.organization.ref)
      .then(invite => {
        this.setState({
          isFetching: false,
          inviteLink: createInviteLink(invite)
        });
      })
      .catch(console.error);
  }

  render() {
    if (this.state.isFetching) {
      return <CircularProgress />;
    }
    return (
      <div>
        <Typography variant="body1" gutterBottom>
          To invite people to your organization, send them this link:
        </Typography>
        <TextField value={this.state.inviteLink} fullWidth margin="normal" />
        <CopyToClipboard
          text={this.state.inviteLink}
          onCopy={() => this.setState({ snackbarOpen: true })}
        >
          <Button variant="raised" color="primary">
            Copy to clipboard
          </Button>
        </CopyToClipboard>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={2000}
          onClose={() => {
            this.setState({ snackbarOpen: false });
          }}
          message="Link copied!"
        />
      </div>
    );
  }
}
export default connect(state => ({
  profile: state.profile
}))(InviteLink);
