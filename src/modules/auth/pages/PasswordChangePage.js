import React from "react";

import AppFrame from "components/AppFrame";
import Page from "components/Page";

import PasswordChangeForm from "../components/PasswordChangeForm";

const PasswordChangePage = () => (
  <AppFrame title="Change Your Password">
    <Page>
      <PasswordChangeForm />
    </Page>
  </AppFrame>
);

export default PasswordChangePage;
