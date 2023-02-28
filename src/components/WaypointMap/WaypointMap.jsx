import React, { useEffect, useState } from "react";
import { useDbData } from "../../utilities/firebase";
import './WaypointMap.css'

const mapEmbedBaseUrl = "https://www.google.com/maps/embed/v1/directions";
const API_KEY = "AIzaSyAres6dxJqN_EEzqHrFIXPHg4tGVuSLERA";
const mapRequestUrl = `${mapEmbedBaseUrl}?key=${API_KEY}`;
const origin = "1 Rue Chevert, 7th arr., 75007 Paris, France";

const WaypointMap = ({page}) => {
  const [data, error] = useDbData();
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [waypoints, setWaypoints] = useState("");
  const user = "user1";

  useEffect(() => {
    if (data) {
        if (data.users[user]["adventure"]["locations"]) {
            setLocations(Object.values(data.users[user]["adventure"]["locations"]));
        } else {
            setLocations([]);
        }
    }
  }, [data])

  useEffect(() => {
    if (locations) {
      const newArray = locations.filter(function (location) {
        return location["selected"] == true;
      });
      setSelectedLocations(newArray);
    }
  }, [locations])

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
    <>
    {
      page == "home" ? (
        <>
          {selectedLocations.length > 0 &&
            <div className="map-banner">
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyAres6dxJqN_EEzqHrFIXPHg4tGVuSLERA&origin="13 Rue du Mail, 75002 Paris, France"&destination=${selectedLocations[selectedLocations.length - 1].address}&waypoints=${waypoints}&mode=walking&zoom=10`}
                >
                </iframe>
            </div>
          }
        </>
      ) : (
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
      )
    }
    </>
  );
};

export default WaypointMap;
