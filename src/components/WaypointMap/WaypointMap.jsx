import React, { useEffect, useState } from "react";
import { useDbData } from "../../utilities/firebase";

const mapEmbedBaseUrl = "https://www.google.com/maps/embed/v1/directions";
const API_KEY = "AIzaSyAres6dxJqN_EEzqHrFIXPHg4tGVuSLERA";
const mapRequestUrl = `${mapEmbedBaseUrl}?key=${API_KEY}`;
const origin = "1 Rue Chevert, 7th arr., 75007 Paris, France";

const WaypointMap = () => {
  const [data, error] = useDbData();
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [waypoints, setWaypoints] = useState("");
  const user = "user1";

  useEffect(() => {
    if (data) {
      if (data.users[user]["adventure"]["selectedLocations"]) {
        setSelectedLocations(
          Object.values(data.users[user]["adventure"]["selectedLocations"]).map(
            (location) => ({
              ...location,
              address: location.address.trim(),
            })
          )
        );
      } else {
        setSelectedLocations([]);
      }
    }
  }, [data]);

  useEffect(() => {
    if (selectedLocations.length <= 1) {
      setWaypoints("");
      return;
    }

    const origin = selectedLocations[0].address;
    const destination = selectedLocations[selectedLocations.length - 1].address;

    const waypoints = selectedLocations.slice(1, -1).map((location) => ({
      location: location.address,
      stopover: true,
    }));

    const directionsService = new google.maps.DirectionsService();
    directionsService
      .route({
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.WALKING,
      })
      .then((response) => {
        const orderedIndices = response.routes[0].waypoint_order;
        const optimalWaypoints = orderedIndices
          .map((id) => `'${waypoints[id].location}'`)
          .join("|");
        setWaypoints(optimalWaypoints);
      })
      .catch((e) =>
        window.alert(
          "No route could be found between the origin and destination."
        )
      );
  }, [selectedLocations]);

  if (!data) {
    return <p>Loading</p>;
  }

  return (
    <div className="map div" style={{ height: "100%" }}>
      {selectedLocations === undefined || selectedLocations.length <= 1 ? (
        <div> No Locations added</div>
      ) : (
        <div style={{ height: "60em" }}>
          <iframe
            width="100%"
            height="100%"
            src={`${mapRequestUrl}&origin="${
              selectedLocations[1].address
            }"&destination="${
              selectedLocations[selectedLocations.length - 1].address
            }"&mode=walking${waypoints && `&waypoints=${waypoints}`}`}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default WaypointMap;
