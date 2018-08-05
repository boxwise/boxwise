import React from "react";
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import ProductButton from "../components/ProductButton";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  productItem: {
    margin: "3px"
  }
});

const ProductCategoryGridItem = ({ classes, icon, label }) => {
  return (
    <Grid item xs={4}>  
      <MenuItem className={classes.productItem}>
        <ProductButton icon={icon} label={label} />
      </MenuItem>
    </Grid>
  );
};

export default withStyles(styles)(ProductCategoryGridItem);
