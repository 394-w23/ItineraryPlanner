import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getData, updateDatabase } from "../../utilities/firebase";

const AdventureCard = ({ adventureLocation }) => {
  const removeLocation = async () => {
    // Get the adventure
    const adventure = await getData("adventures/adventure-id-1");
    const savedLocations = adventure.locations || [];

    // Filter out the location to be removed
    const newSavedLocations = savedLocations.filter((location) => {
      return location.name !== adventureLocation.name;
    });

    // Update the adventure's saved locations in Firebase
    const updates = {};
    updates["adventures/" + "adventure-id-1" + "/locations"] = newSavedLocations;
    updateDatabase(updates);
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
