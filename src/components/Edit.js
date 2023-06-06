import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditClient extends Component {

  constructor(props) {
    super(props)
    this.onChangeClientName = this.onChangeClientName.bind(this);
    this.onChangeClientEmail = this.onChangeClientEmail.bind(this);
    this.onChangeClientno = this.onChangeClientno.bind(this);
    this.onChangeClientAddress = this.onChangeClientAddress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // State
    this.state = {
      name: '',
      email: '',
      clientno: '',
      address: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/clients/edit-client/' + this.props.match.params.id)
    .then(res => {
      this.setState({
        name: res.data.name,
        email: res.data.email,
        clientno: res.data.clientno,
        address: res.data.address
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onChangeClientName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeClientEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeClientno(e) {
    this.setState({ clientno: e.target.value })
  }

  onChangeClientAddress(e) {
    this.setState({ address: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    const clientObject = {
      name: this.state.name,
      email: this.state.email,
      clientno: this.state.clientno,
      address: this.state.address
    };
    axios.put('http://localhost:4000/clients/update-client/' + this.props.match.params.id, clientObject)
      .then((res) => {
        console.log(res.data)
        console.log('Client successfully updated')
      }).catch((error) => {
        console.log(error)
      })
    // Redirect to Client List 
    this.props.history.push('/client-list')
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name" className="mt-4">
          <Form.Label>Nombre</Form.Label>
          <Form.Control 
            type="text" 
            value={this.state.name} 
            onChange={this.onChangeClientName} 
          />
        </Form.Group>
        <Form.Group controlId="Email" className="mt-4">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            value={this.state.email} 
            onChange={this.onChangeClientEmail} 
          />
        </Form.Group>
        <Form.Group controlId="Name" className="mt-4">
          <Form.Label>No. Cliente</Form.Label>
          <Form.Control 
            type="text" 
            value={this.state.clientno} 
            onChange={this.onChangeClientno} 
          />
        </Form.Group>
        <Form.Group controlId="address" className="mt-4">
          <Form.Label>Direccion</Form.Label>
        <Form.Control 
          type="text" 
          value={this.state.address} 
          onChange={this.onChangeClientAddress} 
        />
      </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="success" size="lg" type="submit" className="mt-4">
            Actualizar Cliente
          </Button>
        </div>
      </Form>
    </div>);
  }
}
