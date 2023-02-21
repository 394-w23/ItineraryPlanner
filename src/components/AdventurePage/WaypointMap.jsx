import React, { useEffect, useState } from "react";
import { useDbData } from "../../utilities/firebase";
import ProgressTimer from 'react-progress-bar-timer';


const WaypointMap=  () => {
    const [data, error] = useDbData();
    const [selectedLocations, setSelectedLocations] = useState([])
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

    if (!data) {
        return <p>Loading</p>
    }
    const waypoints = selectedLocations.slice(0, -1).map(str => `'${str.address}'`).join(' | ');
    
    return(
        
        <div class= "map div" style={{"height": "100%"}}>
            <ProgressTimer
  barRounded
  buttonText=""
  classes={{}}
  fontSize={15}
  color="#2f2d2d"
  duration={60}
  fontColor="#ffffff"
  label="Time remaining
"
  onFinish={function noRefCheck(){}}
  showDuration
  started
  variant="fill"
/>
        {selectedLocations=== undefined || selectedLocations.length ==0 ? <div> No Locations added</div> : 
        <div style={{"height": "60em"}}>
            {selectedLocations.length ==1 ? 
                <iframe
                        width = "100%"
                        height="100%"
                        src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyAres6dxJqN_EEzqHrFIXPHg4tGVuSLERA&origin="13 Rue du Mail, 75002 Paris, France"&destination=${selectedLocations[0].address}&mode=walking`}
                >       
                </iframe>
            : 
                <iframe
                        width = "100%"
                        height= "100%"
                        src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyAres6dxJqN_EEzqHrFIXPHg4tGVuSLERA&origin="13 Rue du Mail, 75002 Paris, France"&destination=${selectedLocations[selectedLocations.length-1].address}&waypoints=${waypoints}&mode=walking`}
                >       
                </iframe>
            }
        </div>

    }
        </div>
    )
    
}


export default WaypointMap