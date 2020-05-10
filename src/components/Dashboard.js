import React, { PureComponent } from "react";
import Question from "./Question";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Tabs, Tab, Col } from "react-bootstrap";
import { handleInitialData } from "../actions/shared";

class DashBoard extends PureComponent {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const { unansweredQuestions, answeredQuestions } = this.props;
    return (
      <Col
        md={8}
        lg={8}
        xl={8}
        className="mx-auto my-5 text-center dashboard_container"
      >
        <Tabs
          className="d-flex justify-content-center "
          defaultActiveKey="Unanswered"
          id="uncontrolled-tab-example"
        >
          <Tab eventKey="Unanswered" title="Unanswered Questions">
            {!!unansweredQuestions &&
              unansweredQuestions.map((i) => (
                <div key={i}>
                  <Question id={i} />
                </div>
              ))}
          </Tab>

          <Tab eventKey="Answered" title="Answered Questions">
            {answeredQuestions.map((i) => (
              <div key={i}>
                <Question id={i} />
              </div>
            ))}
          </Tab>
        </Tabs>
      </Col>
    );
  }
}

DashBoard.propTypes = {
  answeredPolls: PropTypes.array,
  unansweredPolls: PropTypes.array,
};

function mapStateToProps({ questions, users, authedUser }) {
  const user = users[authedUser];
  const answeredQuestions = Object.keys(user.answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  return {
    unansweredQuestions: Object.keys(questions)
      .filter((qid) => !answeredQuestions.includes(qid))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => {
      dispatch(handleInitialData());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
