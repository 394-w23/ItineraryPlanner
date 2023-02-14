import React from 'react'
import Card from 'react-bootstrap/Card';

const AdventureCard = ({ adventure }) => {

  console.log(adventure)

  return (
    <>
    {adventure.locations.map(location => 
        (<Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={location.image} />
        <Card.Body>
          <Card.Title>{location.name}</Card.Title>
          <Card.Text>
            {location.address}
          </Card.Text>
        </Card.Body>
      </Card>))}
    </>
  )
}

export default AdventureCard