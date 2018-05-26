import React from "react";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import AppFrame from "components/AppFrame";
import Page from "components/Page";

const styles = theme => ({});

const ProductsPage = ({ auth, classes, firebase }) => (
  <AppFrame title="Products">
    <Page>
      <Typography variant="body1" gutterBottom>
        Hello world
      </Typography>
    </Page>
  </AppFrame>
);

export default compose(withStyles(styles))(ProductsPage);
