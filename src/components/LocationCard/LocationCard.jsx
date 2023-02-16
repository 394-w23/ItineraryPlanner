import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getData, updateDatabase } from "../../utilities/firebase";

const LocationCard = ({ location }) => {

  const saveLocation = async () => {
    // Get the 1st adventure
    const adventure = await getData("adventures/adventure-id-1");
    const updates = {};
    let savedLocations = adventure.locations ? adventure.locations : [];

    // only push if it is not already saved
    const matches = savedLocations.filter(function (savedLocation) {
      return savedLocation.name === location.name;
    });
    if (matches.length == 0) {
      savedLocations.push(location);
      updates["adventures/" + "adventure-id-1" + "/locations"] = savedLocations;
      updateDatabase(updates);
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={location.image} />
      <Card.Body>
        <Card.Title>{location.name}</Card.Title>
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