import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getData, updateDatabase } from "../../utilities/firebase";

const AdventureCard = ({ location }) => {

  const removeLocation = async () => {
    const selectedLocationsUpdated = {}
    const remainingLocationsUpdated = {}
    const selectedLocations = await getData("users/user1/adventure/selectedLocations");
    const remainingLocations = await getData("users/user1/adventure/remainingLocations");
    
    // add to remainingLocations
    remainingLocations.push(location);
    remainingLocationsUpdated["users/user1/adventure/remainingLocations"] = remainingLocations;
    updateDatabase(remainingLocationsUpdated);

    // remove from remainingLocations
    selectedLocationsUpdated["users/user1/adventure/selectedLocations"] = selectedLocations.filter(function (selectedLocation) {
      return selectedLocation.name != location.name;
    });
    updateDatabase(selectedLocationsUpdated);
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={location.image} />
      <Card.Body>
        <Card.Title>{location.name}</Card.Title>
        <Card.Text>Estimated Travel Time: 10min</Card.Text>
        <Card.Text>Estimated Leisure Time: 50min</Card.Text>
        <Button variant="primary" onClick={removeLocation}>Remove from adventure</Button>
      </Card.Body>
    </Card>
  )
}

export default AdventureCard
