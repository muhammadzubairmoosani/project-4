import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Col, Button } from "react-bootstrap";
import { handleAddQuestion } from "../actions/shared";
import { Redirect } from "react-router-dom";

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    redirect: false,
  };

  handleOptionOneChange = (event) => {
    event.preventDefault();
    this.setState({
      optionOne: event.target.value,
    });
  };

  handleOptionTwoChange = (event) => {
    event.preventDefault();
    this.setState({
      optionTwo: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { optionOne, optionTwo } = this.state;
    this.props.addQuestion(optionOne, optionTwo);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    const { optionOne, optionTwo } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="mt-5 text-center">
        <h4 className="mb-4 text-monospace text-secondary">Ask Question</h4>
        <Col className="rounded shadow-lg py-4 mx-auto" xs={12} md={7} lg={6}>
          <h5 className="mb-4">Would You Rather?</h5>
          <Form.Group controlId="formBasicEmail"></Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control
              name="optionOne"
              value={optionOne}
              onChange={this.handleOptionOneChange}
              type="text"
              placeholder="Option One..."
            />
            <Form.Label className="font-weight-bold my-2">Or</Form.Label>
            <Form.Control
              name="optionTwo"
              value={optionTwo}
              onChange={this.handleOptionTwoChange}
              type="text"
              placeholder="Option Two..."
            />
          </Form.Group>

          <Button
            disabled={optionOne === "" || optionTwo === ""}
            className="m-2"
            block
            variant="primary"
            type="submit"
          >
            Ask Question
          </Button>
        </Col>
      </Form>
    );
  }
}

NewQuestion.propTypes = {
  authedUser: PropTypes.string,
  addQuestion: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    addQuestion: (optionOne, optionTwo) => {
      dispatch(handleAddQuestion(optionOne, optionTwo));
    },
  };
}

export default connect(null, mapDispatchToProps)(NewQuestion);
