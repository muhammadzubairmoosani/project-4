import React, { Component } from "react";
import Dashboard from "./Dashboard";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";
import NewQuestion from "./NewQuestion";
import QuestionDetails from "./QuestionDetails";
import NotFound from "./NotFound";
import Logout from "./Logout";
import NavBar from "./NavBar";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { handleInitialData } from "../actions/shared";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Login} />
          <AuthenticatedRoutes exact path="/dashboard" component={Dashboard} />
          <AuthenticatedRoutes
            exact
            path="/leaderboard"
            component={LeaderBoard}
          />
          <AuthenticatedRoutes exact path="/add" component={NewQuestion} />
          <AuthenticatedRoutes
            exact
            path="/questions/:id"
            component={QuestionDetails}
          />
          <AuthenticatedRoutes exact path="/logout" component={Logout} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  handleInitialData: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => {
      dispatch(handleInitialData());
    },
  };
}

export default connect(null, mapDispatchToProps)(App);
