import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getData, updateDatabase } from "../../utilities/firebase";

const LocationCard = ({ location }) => {

  const saveLocation = async () => {
    const selectedLocationsUpdated = {}
    const remainingLocationsUpdated = {}
    let selectedLocations = await getData("users/user1/adventure/selectedLocations");
    const remainingLocations = await getData("users/user1/adventure/remainingLocations");
    
    if (selectedLocations == null) {
      selectedLocations = [];
    }

    // only push if it is not already saved
    const matches = selectedLocations.filter(function (savedLocation) {
      return savedLocation.name === location.name;
    });
    
    if (matches.length == 0) {
      // add to remainingOptions
      var selectedLocations_last = selectedLocations[selectedLocations.length - 1]
      selectedLocations = selectedLocations.slice(0, -1);
      selectedLocations.push(location);
      selectedLocations.push(selectedLocations_last)
      selectedLocationsUpdated["users/user1/adventure/selectedLocations"] = selectedLocations;
      updateDatabase(selectedLocationsUpdated);

      // remove from remainingLocations
      remainingLocationsUpdated["users/user1/adventure/remainingLocations"] = remainingLocations.filter(function (remainingLocation) {
        return remainingLocation.name != location.name;
      });
      updateDatabase(remainingLocationsUpdated);
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      <Card.Img variant="top" src={location.image} />
      <Card.Body>
        <Card.Title>{location.name}</Card.Title>
        <Card.Text>Suggested Time: {location.suggestedTime ? location.suggestedTime : 0} Hr</Card.Text>
        <Button variant="primary" onClick={saveLocation}>Add to adventure</Button>
      </Card.Body>
    </Card>
  )
}

export default LocationCard