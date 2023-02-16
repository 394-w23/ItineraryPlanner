import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getData, updateDatabase } from "../../utilities/firebase";

const AdventureCard = ({ location }) => {

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
        <Card.Text>Minimum Time Needed: 1hr</Card.Text>
        <iframe
                width = "100%"
                height="auto"
                src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyAres6dxJqN_EEzqHrFIXPHg4tGVuSLERA&origin="13 Rue du Mail, 75002 Paris, France"&destination=${location.address}&mode=walking`}
                >
            </iframe>
        <Button variant="primary" onClick={removeLocation}>Remove from adventure</Button>
      </Card.Body>
    </Card>
  )
}

export default AdventureCard
