import React from "react";
import "./HomePage.css";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

const HomePage = ({ user }) => {
  return (
    <Grid container xs={12} sm={12} md={7} lg={6} xl={5} className="grid">
      <div className="header">
        <div className="logo">Boxwise</div>
        <div className="login">
          <a href="/signin">Login or sign up</a>
        </div>
      </div>
      <div className="content">
        <img src="/images/header-image.jpg" alt="warehouse" className="image" />
        Boxwise is reincarnation of the Drop App, the revolutionary warehouse
        and distribution tool that was made for the Drop in the Ocean clothing
        distribution in the Nea Kavala refugee camp in Northern Greece.<br />
        <br />
        Boxwise is for everyone, but now it is still in a very early stage of
        development. Join us on{" "}
        <a
          href="https://www.facebook.com/groups/1622978634422650/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>{" "}
        to keep yourself informed. Do you want to take part in the development
        of Boxwise? Join us on{" "}
        <a
          href="https://join.slack.com/t/boxwise/shared_invite/enQtMzc2MDM5MjcyNTQ0LWQ2MDg3Y2NlNTFhMWUwYmNhMmQ4YzAyMTA4M2E5NDQwZWVmY2RmMDMzZDBiZmE4NWQzYzc4NjMyNjRiYzMyYWI"
          target="_blank"
          rel="noopener noreferrer"
        >
          Slack
        </a>{" "}
        and{" "}
        <a
          href="https://github.com/boxwise/boxwise"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>!
      </div>
    </Grid>
  );
};

HomePage.propTypes = {
  user: PropTypes.object
};

export default HomePage;
