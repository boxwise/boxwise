import React from "react";

import { Page, AppFrame } from "modules/layout/components";

import PasswordChangeForm from "../components/PasswordChangeForm";

const PasswordChangePage = () => (
  <AppFrame title="Change Your Password">
    <Page>
      <PasswordChangeForm />
    </Page>
  </AppFrame>
);

export default PasswordChangePage;
