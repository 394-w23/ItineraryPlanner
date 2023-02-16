import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const AdventureCard = ({ adventureLocation }) => {
  const removeLocation = async () => {
    // TODO
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={adventureLocation.image} />
      <Card.Body>
        <Card.Title>{adventureLocation.name}</Card.Title>
        <Card.Text>Estimated Travel Time: 10min</Card.Text>
        <Card.Text>Estimated Leisure Time: 50min</Card.Text>
        <Button variant="primary" onClick={removeLocation}>Remove from adventure</Button>
      </Card.Body>
    </Card>
  )
}

export default AdventureCard