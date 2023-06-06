import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

const ShowDetails = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)
  const { id } = useParams();

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    await axios.get('https://fakestoreapi.com/products/'+id)
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  };

  if (loading) {
    return <>Loading...</>;
  }
  const price = Number(data.price).toFixed(2);

  return(
    <>
      <div className="form-wrapper py-5 my-5 justify-center">
        <h1>{data.title}</h1>
        <br></br>
        <br></br>
        <p className="title">this product has {data.rating.rate} / 5 stars</p>
        <Card style={{ width: '100%' }}>
          <Card.Img variant="top" src={data.image} />
          <Card.Body>
              <Card.Title>{data.title}</Card.Title>
              <Card.Subtitle className="my-3 text-muted">Category: {data.category}</Card.Subtitle>
              <Card.Subtitle className="my-3 text-muted">Price: ${price}</Card.Subtitle>
              <Card.Text>Description: {data.description}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default ShowDetails;
