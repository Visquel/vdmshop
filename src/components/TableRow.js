import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class TableRow extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.id}</td>  
        <td><img src={this.props.obj.image} alt='image' width="150"/></td>
        <td>{this.props.obj.title}</td>  
        <td width="100">$ {this.props.obj.price}</td>
        <td>{this.props.obj.description}</td>
        <td width="150">{this.props.obj.category}</td>
        <td>{this.props.obj.rating.rate} / 5</td>
      </tr>
    );
  }
}