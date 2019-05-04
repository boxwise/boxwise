import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { captureException } from "errorHandling";

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
        After giving us a few details about your organization, you&apos;ll then
        be able to invite your co-workers to join you in using Boxwise.
      </Typography>
      <br />
      <br />
      <CreateOrganizationForm
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(false);
          onDone(data);
        }}
      />
    </div>
  );
};

const UserStep = ({ organizationData, onDone }) => {
  const [serverError, setServerError] = useState("");
  return (
    <SignUpForm
      submitButtonText="Continue"
      serverError={serverError}
      onSubmit={({ name, email, password }) => {
        return addOrganization(organizationData)
          .then(organization => {
            return createUserAndProfile(
              { email, password },
              { name, organization }
            );
          })
          .then(onDone)
          .catch(error => {
            // TODO: handle user errors, log everything else
            captureException(error);
            setServerError(error.message);
          });
      }}
    />
  );
};

const InviteStep = ({ onDone }) => {
  return (
    <div>
      {/* put the button inside the component so it doesn't show while loading */}
      <InviteLink>
        <React.Fragment>
          <br />
          <br />
          <Button variant="contained" color="primary" onClick={onDone}>
            Continue
          </Button>
        </React.Fragment>
      </InviteLink>
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
  constructor(props) {
    super(props);
    this.state = {
      step: "organization",
      organizationData: null
    };
  }

  render() {
    const { step, organizationData, onDone } = this.state;
    switch (step) {
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
            organizationData={organizationData}
            onDone={() => this.setState({ step: "invite" })}
          />
        );
      case "invite":
        return <InviteStep onDone={() => this.setState({ step: "done" })} />;
      case "done":
        return <DoneStep onDone={onDone} />;
      default:
        throw new Error("unknown step");
    }
  }
}

export default CreateOrganizationFlow;
