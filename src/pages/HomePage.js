import React from "react";
import { Container, Row } from "reactstrap";
import { connect } from "react-redux";
import { isEmpty, isLoaded } from "react-redux-firebase";

const HomePage = ({ auth }) => (
  <Container>
    <Row className="mb-4">
      <h1>Drop App</h1>
    </Row>
    <Row className="mb-4">
      {!isLoaded(auth) ? (
        <p>Loading...</p>
      ) : isEmpty(auth) ? (
        <p>You are not logged in.</p>
      ) : (
        <p>Hello {auth.email}.</p>
      )}
    </Row>
  </Container>
);

const mapStateToProps = state => ({
  auth: state.firebase.auth
});

export default connect(mapStateToProps)(HomePage);
