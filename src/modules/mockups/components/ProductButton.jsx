import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";

const styles = () => ({
  categorySelect: {
    float: "left",
    backgroundColor: "#eee",
    width: 85,
    height: 85,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  categoryIcon: {
    fontSize: 35,
    textAlign: "center",
    color: "009BD9"
  },
  categoryTitle: {
    textAlign: "center"
  }
});

const ProductButton = ({ classes, icon, label }) => {
  return (
    <ButtonBase className={classes.categorySelect}>
      <Typography component="p" className={classes.categoryIcon}>
        <i className={`fas fa-${icon}`} />
      </Typography>
      <Typography component="p" className={classes.categoryTitle}>
        {label}
      </Typography>
    </ButtonBase>
  );
};

export default withStyles(styles)(ProductButton);
