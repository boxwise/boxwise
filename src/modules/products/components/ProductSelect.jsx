import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

const ProductSelect = ({ products, value, onChange, ...props }) => (
  <FormControl fullWidth>
    <InputLabel>Filter by product</InputLabel>
    <Select
      native
      value={value}
      onChange={e => onChange(e.target.value)}
      {...props}
    >
      <option value="" />
      {products.map(n => (
        <option key={n.id} value={n.id}>
          {n.category} / {n.name}
        </option>
      ))}
    </Select>
  </FormControl>
);

export default ProductSelect;
