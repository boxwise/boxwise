import React from "react";
import TextField from "@material-ui/core/TextField";

const PasswordField = ({ label, name, value, dataTestId, ...props }) => (
  <TextField
    label={label}
    name={name}
    id={name}
    type="password"
    fullWidth
    margin="normal"
    value={value || ""}
    inputProps={{
      "data-testid": dataTestId
    }}
    {...props}
  />
);

export default PasswordField;
