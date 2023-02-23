import React, { useEffect, useState } from "react";
import { useDbData } from "../../utilities/firebase";
import ProgressTimer from 'react-progress-bar-timer';

const apiKey = "AIzaSyCpuxnrQwGwxNCmBFUxCuuDsR9qc1heYB8";
const baseUrl = "http://localhost:8080/https://maps.googleapis.com/maps/api/directions/json";


const WaypointMap =  () => {
    const [data, error] = useDbData();
    const [selectedLocations, setSelectedLocations] = useState([])
    const [waypoints, setWaypoints] = useState([])
    const user = "user1"

    useEffect(() => {
        if (data) {
            if (data.users[user]["adventure"]["selectedLocations"]) {
                setSelectedLocations(Object.values(data.users[user]["adventure"]["selectedLocations"]));
            } else {
                setSelectedLocations([]);
            }
        }
    }, [data])

    useEffect(() => {
        const optimizeAndSetWaypoints = async () => {
          if (selectedLocations.length > 1) {
            const optimizedWaypoints = await optimizeWaypoints(
              selectedLocations.slice(0, -1)
            );
            const formattedWaypoints = optimizedWaypoints
              .map((str) => `'${str.address}'`)
              .join(" | ");
            setWaypoints(formattedWaypoints);
          }
        };
        optimizeAndSetWaypoints();
      }, [selectedLocations]);
      

    if (!data) {
        return <p>Loading</p>
    }

    // Helper function to encode the address string for use in URL query parameters
    const encodeAddress = (address) => encodeURIComponent(address);

    // Helper function to format the distance and duration data
    const formatData = (data) => {
        const distance = data.distance?.value || 0;
        const duration = data.duration?.value || 0;
        return { distance, duration };
    };

    // Function to get the distance and duration between two addresses
    const getDistanceAndDuration = async (origin, destination) => {
        const url = `${baseUrl}?origin=${encodeAddress(origin)}&destination=${encodeAddress(destination)}&key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.status !== "OK") {
            throw new Error(`Failed to get distance and duration: ${data.status}`);
        }
        const leg = data.routes[0].legs[0];
        return formatData(leg);
    };

    const calculateTotalTime = async (waypoints) => {
        let totalTime = 0;
        for (let i = 0; i < waypoints.length - 1; i++) {
            const [origin, destination] = [waypoints[i].address, waypoints[i+1].address];
            const { duration } = await getDistanceAndDuration(origin, destination);
            totalTime += duration;
        }
        return totalTime;
    }

    const optimizeWaypoints = async (waypoints) => {
        return new Promise(async (resolve, reject) => {
          let optimizedWaypoints = [...waypoints];
          let minTime = await calculateTotalTime(waypoints);
          for (let i = 1; i < waypoints.length - 2; i++) {
            for (let j = i + 1; j < waypoints.length - 1; j++) {
              let tempWaypoints = [...waypoints];
              tempWaypoints.splice(i, 1);
              tempWaypoints.splice(j - 1, 0, waypoints[i]);
              let totalTime = await calculateTotalTime(tempWaypoints);
              //   show the progress of the optimization
              console.log("Optimizing...", (i / waypoints.length) * 100, "%" );
              if (totalTime < minTime) {
                optimizedWaypoints = tempWaypoints;
                minTime = totalTime;
              }
            }
          }
          resolve(optimizedWaypoints);
        });
      };
      

    // Fisher-Yates shuffle algorithm
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    return(
        
        <div className= "map div" style={{"height": "100%"}}>
        {selectedLocations=== undefined || selectedLocations.length ===0 ? <div> No Locations added</div> : 
        <div style={{"height": "60em"}}>
            {selectedLocations.length ===1 ? 
                <iframe
                        width = "100%"
                        height="100%"
                        src={`https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin="13 Rue du Mail, 75002 Paris, France"&destination=${selectedLocations[0].address}&mode=walking`}
                >       
                </iframe>
            : 
                <iframe
                        width = "100%"
                        height= "100%"
                        src={`https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin="13 Rue du Mail, 75002 Paris, France"&destination=${selectedLocations[selectedLocations.length-1].address}&waypoints=${waypoints}&mode=walking`}
                >       
                </iframe>
            }
        </div>

    }
        </div>
    )
    
}


export default WaypointMap