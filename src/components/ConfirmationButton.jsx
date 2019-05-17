import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";

import ConfirmationDialog from "./ConfirmationDialog";

const ConfirmationButton = ({
  confirmationText,
  confirmationAction,
  dataTestId,
  onConfirm,
  children
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <React.Fragment>
      <IconButton
        onClick={() => setDialogOpen(true)}
        aria-label={confirmationAction}
        data-testid={`${dataTestId}Button`}
      >
        {children}
      </IconButton>
      <ConfirmationDialog
        data-testid={`${dataTestId}Dialog`}
        confirmationAction={confirmationAction}
        open={dialogOpen}
        onCancel={() => setDialogOpen(false)}
        onConfirm={() => {
          setDialogOpen(false);
          onConfirm();
        }}
      >
        {confirmationText}
      </ConfirmationDialog>
    </React.Fragment>
  );
};
export default React.memo(ConfirmationButton);
