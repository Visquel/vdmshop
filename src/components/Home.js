import React, { Component } from "react";
import axios from 'axios';
import "../App.css";
import List from "./List";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

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
        <div className="form-wrapper">
        <button
          style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem"
          }}
          onClick={this.onLogoutClick}
          className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        >
          Logout
        </button>
          <h1>Bienvenido {user.name}</h1>
          <br></br>
          <br></br>
          <p className="title">Actualmente existen {this.state.data.length} productos disponibles en el sistema, puede visualizar los detalles en la tabla debajo</p>
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