import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getData, updateDatabase } from "../../utilities/firebase";

const LocationCard = ({ location }) => {

  console.log(location)

  const saveLocation = async () => {
    // Get the 1st adventure
    const adventure = await getData("adventures/adventure-id-1");
    const updates = {};
    let savedLocations = adventure.locations ? adventure.locations : [];
    savedLocations.push(location);
    updates["adventures/" + "adventure-id-1" + "/locations"] = savedLocations;
    updateDatabase(updates);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={location.image} />
      <Card.Body>
        <Card.Title>{location.name}</Card.Title>
        <Card.Text>
          {location.address}
        </Card.Text>
        <Button variant="primary" onClick={saveLocation}>Add to adventure</Button>
      </Card.Body>
    </Card>
  )
}

export default LocationCard