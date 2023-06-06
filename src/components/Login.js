import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/home");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="form-wrapper">
        <Link to="/" className="text-success mb-4">
            Back to home
        </Link>
        <div className="mt-4">
          <h4 className="text-center title">
            <b>Login</b>
          </h4>
        </div>
        <Form noValidate onSubmit={this.onSubmit}>
          <Form.Group className="mt-4">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              id="email"
              type="email"
              placeholder="Email"
              className={classnames("", {
                invalid: errors.email || errors.emailnotfound
              })}
            />
            <span className="text-danger">
              {errors.email}
              {errors.emailnotfound}
            </span>
          </Form.Group>

          <Form.Group className="mt-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              id="password"
              type="password"
              placeholder="password"
              className={classnames("", {
                invalid: errors.password || errors.passwordincorrect
              })}
            />
            <span className="text-danger">
              {errors.password}
              {errors.passwordincorrect}
            </span>
          </Form.Group>
          <div className="d-grip gap-2">
            <Button
              type="submit"
              className="mt-4"
              variant="success"
              size="lg"
            >
              Login
            </Button>
          </div>
        </Form>
        <p className="mt-4 text-secondary">
          Don't have an account? <Link to="/register" className="text-success">Register</Link>
        </p>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);