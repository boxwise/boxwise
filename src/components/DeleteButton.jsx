import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

const DeleteButton = ({ confirmationText, onDelete }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <React.Fragment>
      <IconButton
        onClick={() => setDialogOpen(true)}
        aria-label="Delete"
        data-cy="deleteProductButton"
      >
        <DeleteIcon />
      </IconButton>
      <DeleteConfirmationDialog
        open={dialogOpen}
        onCancel={() => setDialogOpen(false)}
        onConfirm={() => {
          setDialogOpen(false);
          onDelete();
        }}
      >
        {confirmationText}
      </DeleteConfirmationDialog>
    </React.Fragment>
  );
};
export default React.memo(DeleteButton);
