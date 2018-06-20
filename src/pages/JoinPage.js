import React from "react";
import { withRouter } from "react-router-dom";
import { FirestoreDocument } from "react-firestore";
import SignUpForm from "../components/SignUpForm";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Page from "../components/Page";
import { createUserAndProfile } from "../auth";
import { handleError } from "../utils";

// TODO: clean this up. needs some separate components and containers.

const JoinPage = ({ history, match }) => (
  <Page>
    <Grid container spacing={24} justify="center" alignItems="center">
      <Grid item xs={12} md={4}>
        <Typography variant="display1">Join Boxwise</Typography>
        <br />
        <FirestoreDocument
          path={`invites/${match.params.inviteId}`}
          render={({ isLoading, data: invite, snapshot }) => {
            if (isLoading) {
              return <CircularProgress />;
            } else if (!snapshot.exists) {
              return (
                <Typography variant="body1">
                  This invite link is invalid. Ask the person who sent it to you
                  to try making it again.
                </Typography>
              );
            }
            return (
              <FirestoreDocument
                path={`organizations/${invite.organization.id}`}
                render={({ isLoading, data: organization }) => {
                  if (isLoading) {
                    return <CircularProgress />;
                  } else {
                    return (
                      <React.Fragment>
                        <Typography variant="body1">
                          You have been invited by{" "}
                          <strong>{organization.name}</strong> to join them on
                          Boxwise.
                        </Typography>
                        <SignUpForm
                          onSubmit={(
                            { name, email, password },
                            { setSubmitting, setErrors }
                          ) => {
                            createUserAndProfile(
                              { email, password },
                              { name, organization: invite.organization }
                            )
                              .then(user => {
                                setSubmitting(false);
                                /* setTimeout because we need to let AuthedRoute update */
                                setTimeout(() => history.push("/"));
                              })
                              .catch(error => {
                                setSubmitting(false);
                                // TODO: handle user error, throw everything else
                                handleError(error);
                                setErrors({ form: error.message });
                              });
                          }}
                          submitButtonText="Join"
                        />
                        <br />
                      </React.Fragment>
                    );
                  }
                }}
              />
            );
          }}
        />
      </Grid>
    </Grid>
  </Page>
);

export default withRouter(JoinPage);
