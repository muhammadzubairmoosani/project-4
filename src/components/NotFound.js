import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Col } from "react-bootstrap";

const NotFound = ({ history }) => (
  <Col className="text-center mx-auto my-5" xs={6}>
    <Card>
      <Card.Header>404</Card.Header>
      <Card.Body>
        <Card.Title>Page Not Found</Card.Title>
        <Button size="small" color="primary" onClick={() => history.push("/")}>
          Go Home
        </Button>
      </Card.Body>
    </Card>
  </Col>
);

NotFound.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default NotFound;
