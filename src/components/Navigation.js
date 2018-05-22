import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Navigation = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit">
        Drop App
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Navigation;
