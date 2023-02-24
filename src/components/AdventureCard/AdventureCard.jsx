import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getData, updateDatabase } from "../../utilities/firebase";

const AdventureCard = ({ location }) => {
  // console.log("location", location)

  const removeLocation = async () => {
    const selectedLocationsUpdated = {}
    const remainingLocationsUpdated = {}
    const selectedLocations = await getData("users/user1/adventure/selectedLocations");
    let remainingLocations = await getData("users/user1/adventure/remainingLocations");
    
    if (remainingLocations == null) {
      remainingLocations = [];
    }

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
    <Card style={{ width: '18rem', margin: '1rem' }}>
      <Card.Img variant="top" src={location.image} />
      <Card.Body>
        <Card.Title>{location.name}</Card.Title>
        <Card.Text>Suggested Time: {location.suggestedTime ? location.suggestedTime : 0} Hr</Card.Text>
        {!location["startOrEnd"] && <Button variant="primary" onClick={removeLocation}>Remove from adventure</Button>}
      </Card.Body>
    </Card>
  )
}

export default AdventureCard
