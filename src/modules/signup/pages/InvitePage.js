import React from "react";

import AppFrame from "components/AppFrame";
import Page from "components/Page";

import InviteLink from "../containers/InviteLink";

const InvitePage = () => (
  <AppFrame title="Invite people">
    <Page>
      <InviteLink />
    </Page>
  </AppFrame>
);

export default InvitePage;
