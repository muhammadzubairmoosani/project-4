import React from "react";
import PropTypes from "prop-types";
// import { Button, Card, CardBody, CardHeader } from "reactstrap";
import CardTitle from "reactstrap/es/CardTitle";
import { Card,Button } from "react-bootstrap";

const NotFound = ({ history }) => (
  <Card>
    <Card.Header>404</Card.Header>
    <Card.Body>
      <Card.Title>Page Not Found</Card.Title>
      <Button size="small" color="primary" onClick={() => history.push("/")}>
        Go Home
      </Button>
    </Card.Body>
  </Card>
);

NotFound.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default NotFound;
