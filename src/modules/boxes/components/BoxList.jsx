import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import SelectField from "components/SelectField";
import Progress from "components/Progress";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4
  },
  empty: theme.mixins.gutters({
    textAlign: "center",
    marginTop: theme.spacing.unit * 4
  }),
  progress: {
    margin: theme.spacing.unit * 4,
    display: "flex",
    justifyContent: "center"
  },
  productSelect: theme.mixins.gutters({})
});

const BoxList = ({
  classes,
  boxesWithProductInfo,
  products,
  fetchBoxesAndProducts
}) => {
  const [filterByProductId, setFilterByProductId] = useState(undefined);

  useEffect(() => {
    fetchBoxesAndProducts();
  }, [fetchBoxesAndProducts]);
  let filteredData = boxesWithProductInfo.data;
  if (filterByProductId)
    filteredData = filteredData.filter(
      box => box.productId === filterByProductId
    );

  let list;

  if (boxesWithProductInfo.loading) {
    list = (
      <div className={classes.progress}>
        <Progress />
      </div>
    );
  } else if (!filteredData.length) {
    list = (
      <Typography className={classes.empty}>
        No boxes{filterByProductId ? " that matches your current filter" : ""}.{" "}
        <Link to="/">Make some?</Link>
      </Typography>
    );
  } else {
    list = (
      <List>
        <Divider />
        {filteredData.map(box => (
          <React.Fragment key={box.id}>
            <ListItem>
              <ListItemText
                primary={
                  <span>
                    <strong>{box.humanId}</strong> {box.quantity}x{" "}
                    {box.productCategory} / {box.productName}
                  </span>
                }
                secondary={box.comment ? box.comment : " "}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.productSelect}>
        <SelectField
          items={products.data}
          itemToId={item => item.id}
          itemToText={item => `${item.category} / ${item.name}`}
          value={filterByProductId || ""}
          name="productIdFilter"
          defaultText="(All products)"
          label="Filter by product"
          dataTestId="productsFilter"
          onChange={({ target }) => setFilterByProductId(target.value)}
        />
      </div>
      <br />
      {list}
    </div>
  );
};

export default withStyles(styles)(BoxList);
