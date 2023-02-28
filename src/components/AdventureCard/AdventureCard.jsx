import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getData, updateDatabase } from "../../utilities/firebase";
import '../AdventureCard/AdventureCard.css'


const AdventureCard = ({ location }) => {
  // console.log("location", location)

  const saveLocation = async () => {
    const locationsUpdated = {}
    let locations = await getData("users/user1/adventure/locations");
    
    if (locations) {
      var index = locations.map(function(location) { return location["name"]; }).indexOf(location["name"]);
      locations[index]["selected"] = true;

      locationsUpdated["users/user1/adventure/locations"] = locations;
      updateDatabase(locationsUpdated);
    }
  };

  const removeLocation = async () => {
    const locationsUpdated = {}
    let locations = await getData("users/user1/adventure/locations");
    
    if (locations) {
      var index = locations.map(function(location) { return location["name"]; }).indexOf(location["name"]);
      locations[index]["selected"] = false;

      locationsUpdated["users/user1/adventure/locations"] = locations;
      updateDatabase(locationsUpdated);
    }
  };

  return (
    <>
    { location["selected"] ? 
    <Card className="selected">
      <Card.Img variant="top" src={location.image} />
      <Card.Body>
        <Card.Title>{location.name}</Card.Title>
        <Card.Text>Suggested Time: {location.suggestedTime ? location.suggestedTime : 0} Hr</Card.Text>
        {!location["startOrEnd"] && <Button variant="primary" onClick={removeLocation}>Remove from adventure</Button>}
      </Card.Body>
    </Card>
    :
    <Card className="unselected">
      <Card.Img variant="top" src={location.image} />
      <Card.Body>
        <Card.Title>{location.name}</Card.Title>
        <Card.Text>Suggested Time: {location.suggestedTime ? location.suggestedTime : 0} Hr</Card.Text>
        {!location["startOrEnd"] && <Button variant="primary" onClick={saveLocation}>Add to adventure</Button>}
      </Card.Body>
    </Card>
    }

    </>
    
  )
}

export default AdventureCard
