import React from "react";
import { Field } from "formik";
import TextField from "../vendor/formik-material-ui/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "react-select";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const SelectProduct = ({ handleChange, products, values }) => (
  <Field
    name="productString"
    component={TextField}
    onChange={handleChange}
    label="Product"
    value={values.productString || ""}
    fullWidth
    autoFocus
    margin="dense"
    InputProps={{
      inputComponent: Select,
      inputProps: {
        multi: false,
        simpleValue: true,
        placeholder: "",
        options: products.map(({ id, name, category }) => ({
          label: category + " / " + name,
          value: JSON.stringify({ id, category, name })
        })),
        clearable: false,
        optionComponent: Option,
        noResultsText: "No results found",
        arrowRenderer: arrowProps =>
          arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
      }
    }}
  />
);

class Option extends React.Component {
  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

export default SelectProduct;
