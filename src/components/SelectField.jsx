import React from "react";
import TextField from "@material-ui/core/TextField";

const SelectField = ({
  label,
  name,
  value,
  defaultText,
  items,
  itemToId,
  itemToText,
  dataTestId,
  ...props
}) => (
  <TextField
    label={label}
    name={name}
    id={name}
    select
    fullWidth
    margin="normal"
    value={value || ""}
    SelectProps={{
      // we use native select elements for a better mobile experience
      // plus it's easier to test
      native: true,
      inputProps: {
        "data-testid": dataTestId
      }
    }}
    {...props}
  >
    <option key="" value="">
      {defaultText}
    </option>
    {items.map(item => (
      <option key={itemToId(item)} value={itemToId(item)}>
        {itemToText(item)}
      </option>
    ))}
  </TextField>
);

export default SelectField;
