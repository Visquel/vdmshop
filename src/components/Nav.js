import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function Nav(){

  return(
    <div className="navbar">
      <div className="logo">VDM Shop</div>
        <ul className="nav-links">
          <Link className="nav-link" to="/home">Products</Link>
        </ul>
    </div>
  );
}
