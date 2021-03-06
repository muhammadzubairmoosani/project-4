import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

class Question extends React.Component {
  getQuestionDetail(e, questionId) {
    let path = `/questions/` + questionId;
    this.props.history.push(path);
  }
  render() {
    const { question, auth } = this.props;
    return (
      <Card
        onClick={(e) => this.getQuestionDetail(e, question.id)}
        className="p-3 my-3 d-flex flex-row align-items-center"
      >
        <div>
          <Card.Text className="text-truncate m-0">
            author: {question.author}
          </Card.Text>
        </div>
        <Card.Body>
          <Card.Title>Would you rather</Card.Title>
          <ul className="question-list">
            <li
              className={
                question.optionOne.votes.includes(auth) ? "optionSelected" : ""
              }
            >
              <Card.Text>{question.optionOne.text}</Card.Text>
            </li>
            <li
              className={
                question.optionTwo.votes.includes(auth) ? "optionSelected" : ""
              }
            >
              <Card.Text>{question.optionTwo.text}</Card.Text>
            </li>
          </ul>
        </Card.Body>
      </Card>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state, { id }) {
  return {
    question: state.questions[id],
    auth: state.authedUser,
  };
}

export default withRouter(connect(mapStateToProps, null)(Question));
