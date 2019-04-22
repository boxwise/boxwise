import React from "react";
import FormHelperText from "@material-ui/core/FormHelperText";

export default ({ message }) =>
  message ? <FormHelperText error>{message}</FormHelperText> : null;
