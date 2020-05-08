import React, { PureComponent } from "react";
import { Form, Button, Card, Col, Row, Label } from "react-bootstrap";

import { connect } from "react-redux";
import User from "./User";
import { handleAnswer } from "../actions/shared";
import PropTypes from "prop-types";

class QuestionDetails extends PureComponent {
  state = {
    selectedOption: "",
  };

  radioSelected = (e) => {
    this.setState({
      selectedOption: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.saveQuestionAnswer(this.state.selectedOption);
  };

  render() {
    const {
      question,
      questionAuthor,
      answer,
      total,
      percOne,
      percTwo,
    } = this.props;
    const { selectedOption } = this.state;

    return (
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Card>
            <Card.Header>
              <User id={questionAuthor.id} />
            </Card.Header>
            <Card.Body>
              <Card.Title className="text-center">Would You Rather</Card.Title>
              {answer ? (
                <div>
                  <Form.Group>
                    <Form.Group check disabled>
                      <Card.Text>
                        <Form.Check
                          type="radio"
                          label={question.optionOne.text}
                          checked={answer === "optionOne"}
                          readOnly
                        />
                      </Card.Text>
                    </Form.Group>

                    <Form.Group check disabled>
                      <Card.Text>
                        <Form.Check
                          type="radio"
                          label={question.optionTwo.text}
                          checked={answer === "optionTwo"}
                          readOnly
                        />
                      </Card.Text>
                    </Form.Group>
                  </Form.Group>
                  <div className="progress">
                    <div
                      className="progress-one"
                      style={{ width: `${percOne}%` }}
                    >{`${percOne}%`}</div>
                    <div
                      className="progress-two"
                      style={{ width: `${percTwo}%` }}
                    >{`${percTwo}%`}</div>
                  </div>
                  <div className="total">Total number of votes: {total}</div>
                </div>
              ) : (
                <Form onSubmit={this.handleSubmit}>
                  <Card.Body>
                    <Card.Title>Would you rather</Card.Title>
                    <Form.Group controlId="radio1">
                      <Card.Text>
                        <Form.Check
                          type="radio"
                          label={question.optionOne.text}
                          id="radio1"
                          name="radio1"
                          value="optionOne"
                          onChange={this.radioSelected}
                        />
                      </Card.Text>

                      <Card.Text>
                        <Form.Check
                          type="radio"
                          label={question.optionTwo.text}
                          id="radio2"
                          name="radio1"
                          value="optionTwo"
                          onChange={this.radioSelected}
                        />
                      </Card.Text>

                      <Button
                        block
                        disabled={selectedOption === ""}
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Form.Group>
                  </Card.Body>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

QuestionDetails.propTypes = {
  question: PropTypes.object,
  questionAuthor: PropTypes.object,
  answer: PropTypes.string,
  percOne: PropTypes.string.isRequired,
  percTwo: PropTypes.string.isRequired,
};

function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

function mapStateToProps({ questions, users, authedUser }, { match }) {
  const answers = users[authedUser].answers;
  let answer, percOne, percTwo, total;
  const { id } = match.params;
  const question = questions[id];
  if (answers.hasOwnProperty(question.id)) {
    answer = answers[question.id];
  }
  const questionAuthor = users[question.author];
  total = question.optionOne.votes.length + question.optionTwo.votes.length;
  percOne = financial((question.optionOne.votes.length / total) * 100);
  percTwo = financial((question.optionTwo.votes.length / total) * 100);
  return {
    question,
    questionAuthor,
    answer,
    total,
    percOne,
    percTwo,
  };
}

function mapDispatchToProps(dispatch, props) {
  const { id } = props.match.params;

  return {
    saveQuestionAnswer: (answer) => {
      dispatch(handleAnswer(id, answer));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails);
