import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";
import NewQuestion from "./NewQuestion";
import QuestionDetails from "./QuestionDetails";
import NotFound from "./NotFound";
import Logout from "./Logout";

function Routes(props) {
  return (
    <div className="container">
      <Switch>
        {props.notLoggedIn ? (
          <Route path="/" component={Login} />
        ) : (
          <Fragment>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/leaderboard" exact component={LeaderBoard} />
            <Route path="/add" component={NewQuestion} />
            <Route path="/questions/:id" component={QuestionDetails} />
            <Route exact path="/logout" component={Logout} />
            <Route component={NotFound} />
          </Fragment>
        )}
      </Switch>
    </div>
  );
}

Routes.propTypes = { notLoggedIn: PropTypes.any };

export default Routes;
