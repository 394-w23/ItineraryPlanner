import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const LocationCard = ({ location }) => {

  console.log(location)

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={location.image} />
      <Card.Body>
        <Card.Title>{location.name}</Card.Title>
        <Card.Text>
          {location.address}
        </Card.Text>
        <Button variant="primary">Add to adventure</Button>
      </Card.Body>
    </Card>
  )
}

export default LocationCard