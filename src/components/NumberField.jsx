import React from "react";
import MaterialUITextField from "@material-ui/core/TextField";

const TextField = ({ label, name, value, dataTestId, ...props }) => (
  <MaterialUITextField
    label={label}
    name={name}
    id={name}
    type="number"
    fullWidth
    margin="normal"
    value={value || ""}
    inputProps={{
      "data-testid": dataTestId,
      pattern: "[0-9]*",
      inputMode: "numeric"
    }}
    {...props}
  />
);

export default TextField;
