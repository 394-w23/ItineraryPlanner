import React, { useEffect, useMemo, useState } from "react";
import { useDbData } from "../../utilities/firebase";
import ProgressTimer from "react-progress-bar-timer";
import axios from "axios";

const mapEmbedBaseUrl = "https://www.google.com/maps/embed/v1/directions";
const API_KEY = "AIzaSyAres6dxJqN_EEzqHrFIXPHg4tGVuSLERA";
const mapRequestUrl = `${mapEmbedBaseUrl}?key=${API_KEY}`;
const origin = "13 Rue du Mail, 75002 Paris, France";

const WaypointMap = () => {
  const [data, error] = useDbData();
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [waypoints, setWaypoints] = useState("");
  const user = "user1";

  useEffect(() => {
    if (data) {
      if (data.users[user]["adventure"]["selectedLocations"]) {
        setSelectedLocations(
          Object.values(data.users[user]["adventure"]["selectedLocations"])
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

    const destination =
      selectedLocations[selectedLocations.length - 1].address.trim();

    const waypoints = selectedLocations.slice(0, -1).map((str) => ({
      location: str.address.trim(),
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

  console.log(waypoints);

  return (
    <div className="map div" style={{ height: "100%" }}>
      {selectedLocations === undefined || selectedLocations.length === 0 ? (
        <div> No Locations added</div>
      ) : (
        <div style={{ height: "60em" }}>
          <iframe
            width="100%"
            height="100%"
            src={`${mapRequestUrl}&origin="${origin}"&destination="${
              selectedLocations[selectedLocations.length - 1].address
            }"&mode=walking${waypoints && `&waypoints=${waypoints}`}`}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default WaypointMap;
