import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default class TableRow extends Component {

  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    console.log("add to cart product id #", this.props.obj.id);
  }

  render() {
    const price = Number(this.props.obj.price).toFixed(2);
    return (
      <tr>
        <td>{this.props.obj.id}</td>  
        <td><img src={this.props.obj.image} alt='image' width="150"/></td>
        <td>{this.props.obj.title}</td>  
        <td width="100">$ {price}</td>
        <td>{this.props.obj.description}</td>
        <td width="150">{this.props.obj.category}</td>
        <td>{this.props.obj.rating.rate} / 5</td>
        <td>{this.props.obj.rating.count}</td>
        <td width="250">
        <Link className="show-link" to={"/show-details/" + this.props.obj.id}>
          Show Details
        </Link>
        <Button onClick={this.addToCart} size="sm" variant="outline-success">Add to Cart</Button>
      </td>
      </tr>
    );
  }
}