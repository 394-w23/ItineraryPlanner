import React, { useEffect, useState } from "react";
import { useDbData } from "../../utilities/firebase";
import './TimeLeft.css'
import ProgressTimer from 'react-progress-bar-timer';

const TimerComponent = () => (
    
<ProgressTimer
  direction="left"
  duration={3*60*60}
  label="3 hours left"
  onFinish={function noRefCheck(){}}
  rootRounded
  started={true}
  variant="fill"
 />
  );
export default function TimeLeft() {
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

    const calculateTime = () => {
         // calculate remaining time
         let currRemainingTime = 0;
         selectedLocations.forEach(location => {
             if (location.suggestedTime) currRemainingTime += location.suggestedTime;
         })

         return currRemainingTime 
    }
    
    return (
        <div className="time-left-banner">
        <h4 className="time-left">Based on your selections you have {calculateTime()} Hours left</h4>
        </div>
    )
}