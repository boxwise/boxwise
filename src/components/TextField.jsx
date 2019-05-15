import React from "react";
import MaterialUITextField from "@material-ui/core/TextField";

const TextField = ({ label, name, value, dataTestId, ...props }) => (
  <MaterialUITextField
    label={label}
    name={name}
    id={name}
    fullWidth
    margin="normal"
    value={value || ""}
    inputProps={{
      "data-testid": dataTestId
    }}
    {...props}
  />
);

export default TextField;
