import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { PureComponent } from "react";

class NavBar extends PureComponent {
  state = {
    isOpen: false,
    loggedInUser: {},
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { authedUser, users } = this.props;
    [...Object.values(users)].filter(
      (i) => i.id === authedUser && this.setState({ loggedInUser: i })
    );
    return (
      <div>
        {authedUser && (
          <div className="navbar_container">
            <ul className="nav_link">
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/add">Ask New Question</Link>
              </li>
              <li>
                <Link to="/leaderboard">Leader Board</Link>
              </li>
            </ul>
            <ul className="logout">
              <li>
                <Link to="/logout">Logout</Link>
              </li>
              <li>{this.state.loggedInUser.name}</li>
              <li>
                <img
                  src={this.state.loggedInUser.avatarURL}
                  alt="user_avatar"
                  width="50"
                />
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

NavBar.propTypes = {
  authedUser: PropTypes.string,
};

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default withRouter(connect(mapStateToProps, null)(NavBar));
