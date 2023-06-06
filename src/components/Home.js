import React, { Component } from "react";
import axios from 'axios';
import "../App.css";
import List from "./List";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import Button from "react-bootstrap/esm/Button";

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios.get('https://fakestoreapi.com/products')
    .then(res => {
      this.setState({
        data: res.data
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return(
      <>
        <div className="float-end mx-5 px-5">
          <Button
            onClick={this.onLogoutClick}
            className="ml-5 text-right"
            variant="danger"
            size="md"
          >
            Logout
          </Button>
        </div>
        <div className="form-wrapper">
          <h1>Welcome {user.name}</h1>
          <br></br>
          <br></br>
          <p className="title">Here are more than {this.state.data.length} products available in the system, you can see them bellow</p>
        </div>
        <List />
      </>
    );
  }
}

Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Home);