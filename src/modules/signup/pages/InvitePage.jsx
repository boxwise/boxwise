import React from "react";

import { Page, AppFrame } from "modules/layout/components";

import InviteLink from "../containers/InviteLink";

const InvitePage = () => (
  <AppFrame title="Invite people">
    <Page>
      <InviteLink />
    </Page>
  </AppFrame>
);

export default InvitePage;
