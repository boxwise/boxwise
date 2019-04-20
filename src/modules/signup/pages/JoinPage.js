import React from "react";
import { withRouter } from "react-router-dom";
import { FirestoreDocument } from "react-firestore";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Progress from "components/Progress.js";
import Page from "components/Page";
import { createUserAndProfile } from "auth";
import { handleError } from "utils";

import SignUpForm from "../components/SignUpForm";

// TODO: clean this up. needs some separate components and containers.

const JoinPage = ({ history, match }) => (
  <Page>
    <Grid container spacing={24} justify="center" alignItems="center">
      <Grid item xs={12} md={4}>
        <Typography variant="h4">Join Boxwise</Typography>
        <br />
        <FirestoreDocument
          path={`invites/${match.params.inviteId}`}
          render={({ isLoading, data: invite, snapshot }) => {
            if (isLoading) {
              return <Progress />;
            } else if (!snapshot.exists) {
              return (
                <Typography>
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
                    return <Progress />;
                  } else {
                    return (
                      <React.Fragment>
                        <Typography>
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
