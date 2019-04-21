import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { handleError } from "utils";

import { addOrganization, createUserAndProfile } from "../actions";
import InviteLink from "../containers/InviteLink";

import CreateOrganizationForm from "./CreateOrganizationForm";
import SignUpForm from "./SignUpForm";

const OrganizationStep = ({ onDone }) => {
  return (
    <div>
      <Typography gutterBottom>
        Start using Boxwise to manage your warehouse by signing up here.
      </Typography>
      <Typography gutterBottom>
        After giving us a few details about your organization, you'll then be
        able to invite your co-workers to join you in using Boxwise.
      </Typography>
      <br />
      <br />
      <CreateOrganizationForm
        onSubmit={(data, { setSubmitting, setErrors }) => {
          setSubmitting(false);
          onDone(data);
        }}
      />
    </div>
  );
};

const UserStep = ({ organizationData, onDone }) => {
  return (
    <SignUpForm
      submitButtonText="Continue"
      onSubmit={({ name, email, password }, { setSubmitting, setErrors }) => {
        return addOrganization(organizationData)
          .then(organization => {
            return createUserAndProfile(
              { email, password },
              { name, organization }
            );
          })
          .then(onDone)
          .catch(error => {
            setSubmitting(false);
            // TODO: handle user errors, log everything else
            handleError(error);
            setErrors({ form: error.message });
          });
      }}
    />
  );
};

const InviteStep = ({ onDone }) => {
  return (
    <div>
      {/* put the button inside the component so it doesn't show while loading */}
      <InviteLink
        extra={
          <React.Fragment>
            <br />
            <br />

            <Button variant="contained" color="primary" onClick={onDone}>
              Continue
            </Button>
          </React.Fragment>
        }
      />
    </div>
  );
};

const DoneStep = ({ onDone }) => {
  return (
    <div>
      <Typography gutterBottom>
        That’s it! You’re all set up. Let’s start making some boxes...
      </Typography>
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={onDone}>
        Start using Boxwise
      </Button>
    </div>
  );
};

class CreateOrganizationFlow extends React.Component {
  state = {
    step: "organization",
    organizationData: null
  };

  render() {
    switch (this.state.step) {
      case "organization":
        return (
          <OrganizationStep
            onDone={data => {
              this.setState({ organizationData: data, step: "user" });
            }}
          />
        );
      case "user":
        return (
          <UserStep
            organizationData={this.state.organizationData}
            onDone={user => this.setState({ step: "invite" })}
          />
        );
      case "invite":
        return <InviteStep onDone={() => this.setState({ step: "done" })} />;
      case "done":
        return <DoneStep onDone={this.props.onDone} />;
      default:
        throw new Error("unknown step");
    }
  }
}

export default CreateOrganizationFlow;
