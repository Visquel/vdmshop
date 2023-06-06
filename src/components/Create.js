import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';

function Create() {

  const [formValues, setFormValues] = useState({});
  const [addressValues, setAddressValues] = useState(0);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleAddAddress = () => {
    setAddressValues(addressValues + 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let addressArr = [];
    Object.keys(formValues).map( element => {
      if (element.toLocaleLowerCase().includes('address')){
        addressArr.push(formValues[element])
      }
    })
    const clientObject = {
      name: formValues.name,
      email: formValues.email,
      clientno: formValues.clientno,
      address: addressArr
    };

    axios.post('http://localhost:4000/clients/create-client', clientObject)
      .then(res => {
        console.log(res.data)
        alert("Registro exitoso")
        setFormValues({});
        setAddressValues(0);
      });
  };

  return (
    <div className="form-wrapper">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mt-4">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            placeholder="ej: Juan Perez"
            type="text" 
            id="name"
            value={formValues.name || ""} 
            onChange={handleChange} 
          />
        </Form.Group>

        <Form.Group className="mt-4">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            placeholder="ej: Juanp@gmail.com"
            type="email" 
            id="email"
            value={formValues.email || ""} 
            onChange={handleChange} 
          />
        </Form.Group>

        <Form.Group className="mt-4">
          <Form.Label>No. Cliente</Form.Label>
          <Form.Control 
            placeholder="ej: 100"
            type="text" 
            id="clientno"
            value={formValues.clientno || ""} 
            onChange={handleChange} 
          />
        </Form.Group>

        <Form.Group className="mt-4">
          <Form.Label>Direccion 1</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="ej: Santo Domingo, DN"
              type="text" 
              id="address"
              value={formValues.address || ""}
              onChange={handleChange} 
            />
            <Button variant="outline-success" id="button-addon2" onClick={handleAddAddress}>
              Agregar Direccion
            </Button>
          </InputGroup>
        </Form.Group>

        {Array.from(Array(addressValues)).map((c, index) => {
          return (
            <Form.Group className="mt-4">
              <Form.Label>{`Address ${index+2}`}</Form.Label>
              <Form.Control 
                placeholder="ej: Santo Domingo, DN"
                type="text" 
                id={`address_${index}`}
                value={formValues.index}
                onChange={handleChange} 
              />
            </Form.Group>
          );
        })}
        <div className="d-grid gap-2">
          <Button variant="success" size="lg" type="submit" className="mt-4">
            Registrar Cliente
          </Button>
        </div>
      </Form>
    </div>
  );

}

export default Create;
