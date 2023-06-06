import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="form-wrapper mt-5">
        <div className="row">
          <div className="text-center mt-5">
            <h4 className="text-success">
              VDM Shop is an E-commerce business where you can buy products online
            </h4>
            <p className="text-secondary">
              VDM Shop is a Webapp that will shows you the best deals available online
            </p>
            <p className="text-secondary">
              you can start using it bellow
            </p>
            <br />
            <div className="mt-5">
              <Link
                to="/register"
                className="links"
              >
                Register
              </Link>
            </div>
            <div className="mt-5">
              <Link
                to="/login"
                className="links"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;