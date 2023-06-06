import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import TableRow from './TableRow';

export default class List extends Component {

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

  DataTable() {
    return this.state.data.map((res, i) => {
      return <TableRow obj={res} key={i} />;
    });
  }

  render() {
    return (
      <>
        <div className="table-wrapper my-5 py-5">
          <p className="title">Products List</p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
                <th>Rating</th>
                <th>Votes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.DataTable()}
            </tbody>
          </Table>
        </div>
    </>
    );
  }
}
