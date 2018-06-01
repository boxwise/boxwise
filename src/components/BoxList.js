import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4
  },
  progress: {
    margin: theme.spacing.unit * 4,
    display: "flex",
    justifyContent: "center"
  }
});

const BoxList = ({ classes, isLoading, boxes, products }) => {
  const getProduct = id => {
    return products.filter(product => product.id === id)[0];
  };

  if (isLoading) {
    return (
      <div className={classes.progress}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <List className={classes.root}>
      {boxes.map(box => (
        <React.Fragment key={box.id}>
          <ListItem>
            <ListItemText
              primary={`${box.quantity}x ${
                getProduct(box.product.id).category
              } / ${getProduct(box.product.id).name}`}
              secondary={box.comment ? box.comment : " "}
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default withStyles(styles)(BoxList);
