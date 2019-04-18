import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Page from "../components/Page";

const JoinPage = () => (
  <Page>
    <Grid container spacing={24} justify="center" alignItems="center">
      <Grid item xs={12} md={4}>
        <Typography variant="h5">Mockups</Typography>
        <ul>
          <li>
            <Link to="/mockups/make-box">Make box</Link>
          </li>
          <li>
            <Link to="/mockups/find-box">Find box</Link>
          </li>
        </ul>
      </Grid>
    </Grid>
  </Page>
);

export default JoinPage;
