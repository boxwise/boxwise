import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { Page } from "modules/layout/components";
import { fontFamily } from "theme";

const styles = {
  homepage: {
    border: "1px solid #eee",
    textAlign: "center"
  },
  link: {
    color: "#009bd9"
  },
  grid: {
    margin: "0 auto"
  },
  header: {
    margin: "25px 25px",
    width: "100%"
  },
  image: {
    width: "100%",
    marginBottom: "25px"
  },
  logo: {
    textIndent: "-9999px",
    float: "left",
    width: "150px",
    height: "25px",
    background: 'url("/images/boxwise-logo.png") no-repeat',
    backgroundSize: "contain"
  },
  login: {
    textAlign: "right",
    float: "right"
  },
  content: {
    textAlign: "left",
    fontSize: "120%",
    lineHeight: "140%",
    margin: "25px 25px",
    width: "100%",
    maxWidth: "910px",
    fontFamily
  }
};

const HomePage = ({ classes }) => (
  <Page className={classes.homepage}>
    <Grid container className={classes.grid}>
      <div className={classes.header}>
        <div className={classes.logo}>Boxwise</div>
        <div className={classes.login}>
          <Typography>
            <Link className={classes.link} to="/signin">
              Login or sign up
            </Link>
          </Typography>
        </div>
      </div>
      <div className={classes.content}>
        <img
          src="/images/header-image.jpg"
          alt="warehouse"
          className={classes.image}
        />
        Boxwise is reincarnation of the Drop App, the revolutionary warehouse
        and distribution tool that was made for the Drop in the Ocean clothing
        distribution in the Nea Kavala refugee camp in Northern Greece.
        <br />
        <br />
        Boxwise is for everyone, but now it is still in a very early stage of
        development. Join us on{" "}
        <a
          className={classes.link}
          href="https://www.facebook.com/groups/1622978634422650/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>{" "}
        to keep yourself informed. Do you want to take part in the development
        of Boxwise? Join us on{" "}
        <a
          className={classes.link}
          href="https://join.slack.com/t/boxwise/shared_invite/enQtMzc2MDM5MjcyNTQ0LWQ2MDg3Y2NlNTFhMWUwYmNhMmQ4YzAyMTA4M2E5NDQwZWVmY2RmMDMzZDBiZmE4NWQzYzc4NjMyNjRiYzMyYWI"
          target="_blank"
          rel="noopener noreferrer"
        >
          Slack
        </a>{" "}
        and{" "}
        <a
          className={classes.link}
          href="https://github.com/boxwise/boxwise"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        !
      </div>
    </Grid>
  </Page>
);

export default withStyles(styles)(HomePage);
