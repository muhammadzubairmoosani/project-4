import React, { useEffect } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { handleInitialData } from "../actions/shared";

function AuthenticatedRoutes({ component: Component, ...rest }) {
  useEffect(() => {
    rest.handleInitialData();
  }, []);
  return (
    <Route
      {...rest}
      render={function (props) {
        return rest.notLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
}

AuthenticatedRoutes.propTypes = {
  handleInitialData: PropTypes.func.isRequired,
  notLoggedIn: PropTypes.any,
};

function mapStateToProps({ authedUser }) {
  return {
    notLoggedIn: authedUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => {
      dispatch(handleInitialData());
    },
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoutes)
);
