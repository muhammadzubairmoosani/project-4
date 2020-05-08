import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import {Image} from 'react-bootstrap'
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { PureComponent, Fragment } from "react";
import User from "./User";

class NavBar extends PureComponent {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  componentDidMount() {
    console.log(this.props.authedUser)
  }

  render() {
    const { authedUser } = this.props;
    
    return (
      <div>
        <Navbar bg="primary" variant="dark" light expand="md">
          {/* <NavbarBrand tag={Link} to="/">
            Would You Rather
          </NavbarBrand> */}
          {authedUser && (
            <div className="navbar_container">
              <ul className="nab_link">
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
                  <Link to="/logout">
                    Logout
                  </Link>
                </li>
                {/* <li>{user.name}</li> */}
                <li className="w-50">
                  <Image
                    // src={require("../../assets/images/Sarah.png")}
                    className="w-25"
                    roundedCircle
                  />
                </li>
              </ul>
            </div>
          )}
        </Navbar>
      </div>
    );
  }
}

NavBar.propTypes = {
  authedUser: PropTypes.string,
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default withRouter(connect(mapStateToProps, null)(NavBar));

{
  /* <Fragment>
<NavbarToggler onClick={this.toggle}/>
<Collapse isOpen={this.state.isOpen} navbar>
  <Nav className="ml-auto" navbar>
    <NavItem>
      <NavLink tag={Link} to="/add">New Question</NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to="/leaderboard">LeaderBoard</NavLink>
    </NavItem>
    <NavItem>
      <User id={authedUser}/>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to='/logout'>Logout</NavLink>
    </NavItem>
  </Nav>
</Collapse>
</Fragment> */
}
