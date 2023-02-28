import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getData, updateDatabase } from '../../utilities/firebase';
import './AdventureCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const AdventureCard = ({ location }) => {
  const saveLocation = async () => {
    const locationsUpdated = {};
    let locations = await getData('users/user1/adventure/locations');

    if (locations) {
      var index = locations
        .map(function (location) {
          return location['name'];
        })
        .indexOf(location['name']);
      locations[index]['selected'] = true;

      locationsUpdated['users/user1/adventure/locations'] = locations;
      updateDatabase(locationsUpdated);
    }
  };

  const removeLocation = async () => {
    const locationsUpdated = {};
    let locations = await getData('users/user1/adventure/locations');

    if (locations) {
      var index = locations
        .map(function (location) {
          return location['name'];
        })
        .indexOf(location['name']);
      locations[index]['selected'] = false;

      locationsUpdated['users/user1/adventure/locations'] = locations;
      updateDatabase(locationsUpdated);
    }
  };

  return (
    <div className="card-container">
      <div className="button-sidebar">
        {!location['startOrEnd'] && (
          <>
            {location['selected'] ? (
              <Button className="adventure-button-minus" onClick={removeLocation}>
                <FontAwesomeIcon icon={faMinus} />
              </Button>
            ) : (
              <Button className="adventure-button-plus" onClick={saveLocation}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            )}
          </>
        )}
      </div>
      <Card className="card">
        <Card.Img variant="top" src={location.image} className="card-img"/>
        <Card.Body className="adventure-card-body">
          <Card.Title>{location.name}</Card.Title>
          <Card.Text>
            Suggested Time: {location.suggestedTime ? location.suggestedTime : 0} Hr
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdventureCard;
