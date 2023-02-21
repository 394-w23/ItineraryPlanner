import React, { useEffect, useState } from "react";
import { useDbData } from "../../utilities/firebase";
import './TimeLeft.css'
import ProgressTimer from 'react-progress-bar-timer';

const TimerComponent = () => (
    
<ProgressTimer
  direction="left"
  duration={60*60}
  label="3 hours left"
  onFinish={function noRefCheck(){}}
  rootRounded
  started={true}
  variant="fill"
 />
  );
export default function TimeLeft() {
    const [data, error] = useDbData();
    const [selectedLocations, setSelectedLocations] = useState([]);
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
        return <h1>Loading</h1>
    } 

    const startTime = data.users[user]["start time"]
    const endTime = data.users[user]["end time"]
    const freeTime = 5.5

    const calculateTime = () => {
         // calculate remaining time
         let currRemainingTime = freeTime;
         selectedLocations.forEach(location => {
             if (location.suggestedTime) currRemainingTime -= location.suggestedTime;
         })

         return currRemainingTime 
    }
    
    return (
        <div className="time-left-banner">
        <h4 className="time-left">Based on your selections you have {calculateTime()} Hours left</h4>
        </div>
    )
}