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
      selectedLocations.push(location);
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
        <iframe
                width = "100%"
                height="auto"
                src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyAres6dxJqN_EEzqHrFIXPHg4tGVuSLERA&origin="13 Rue du Mail, 75002 Paris, France"&destination=${location.address}&mode=walking`}
                >
            </iframe>
        <Button variant="primary" onClick={saveLocation}>Add to adventure</Button>
      </Card.Body>
    </Card>
  )
}

export default LocationCard