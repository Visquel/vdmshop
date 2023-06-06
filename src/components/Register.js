import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
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
            <b>Register</b>
          </h4>
        </div>
        <Form noValidate onSubmit={this.onSubmit}>
          <Form.Group className="mt-4">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={this.onChange}
              value={this.state.name}
              error={errors.name}
              id="name"
              type="text"
              placeholder="Name"
              className={classnames("", {
                invalid: errors.name
              })}
            />
            <span className="text-danger">
              {errors.name}
            </span>
          </Form.Group>

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
                invalid: errors.email
              })}
            />
            <span className="text-danger">
              {errors.email}
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
              placeholder="Password"
              className={classnames("", {
                invalid: errors.password
              })}
            />
            <span className="text-danger">
              {errors.password}
            </span>
          </Form.Group>

          <Form.Group className="mt-4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              onChange={this.onChange}
              value={this.state.password2}
              error={errors.password2}
              id="password2"
              type="password"
              placeholder="Confirm Password"
              className={classnames("", {
                invalid: errors.password2
              })}
            />
            <span className="text-danger">
              {errors.password2}
            </span>
          </Form.Group>
          <div className="d-grip gap-2">
            <Button
              type="submit"
              className="mt-4"
              variant="success"
              size="lg"
            >
              Sign up
            </Button>
          </div>
        </Form>
        <p className="mt-4 text-secondary">
          Already have an account? <Link to="/login" className="text-success">Log in</Link>
        </p>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));