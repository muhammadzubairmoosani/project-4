import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAuthedUser } from "../actions/authedUser";
import { Form, Button, Col } from "react-bootstrap";

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { userId: "" };
    this._onChangeUser = this._onChangeUser.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onChangeUser(event) {
    this.setState({ userId: event.target.value });
  }

  _onSubmit(event) {
    const { userId } = this.state;
    const { authenticate } = this.props;
    if (userId) {
      authenticate(userId);
      this.props.history.push('/dashboard')
    } else {
      alert("Please select a user before.");
    }
    event.preventDefault();
  }

  render() {
    const { users } = this.props;
    const { userId } = this.state;
    return (
      <Form className="mt-5 text-center" onSubmit={this._onSubmit}>
        <Col
          className="rounded shadow-lg py-4 mx-auto"
          xs={12}
          sm={12}
          md={8}
          lg={6}
        >
          <h4 className="mb-4">Would You Rather?</h4>
          <Form.Group controlId="formBasicEmail"></Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label className="font-weight-bold">
              Login your Account
            </Form.Label>
            <Form.Control
              as="select"
              // onChange={(e) => setSelectedUser(e.target.value)}
              value={userId}
              onChange={this._onChangeUser}
            >
              <option value="-1">Choose your account...</option>
              {Object.entries(users).length &&
                Object.keys(users).map((user, index) => (
                  <option key={user} value={user}>
                    {users[user].name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>

          <Button
            className="mt-2"
            block
            variant="primary"
            disabled={userId === ""}
            type="submit"
          >
            Login
          </Button>
        </Col>
      </Form>
    );
  }
}

Login.propTypes = {
  users: PropTypes.object.isRequired,
  authenticate: PropTypes.func.isRequired,
};

function mapStateToProps({ users }) {
  return {
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: (id) => {
      dispatch(setAuthedUser(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
