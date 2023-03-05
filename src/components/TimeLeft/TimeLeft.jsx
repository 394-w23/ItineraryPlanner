import React, { useEffect, useState } from "react";
import { useDbData } from "../../utilities/firebase";
import { Subject } from 'rxjs';
import './TimeLeft.css'
import ProgressTimer from 'react-progress-bar-timer';

const TimerComponent = () => (
    
<ProgressTimer
  direction="left"
  duration={500}
  label="3 hours left"
  onFinish={function noRefCheck(){}}
  rootRounded
  started={true}
  variant="fill"
 />
  );

// 
const subject = new Subject()
export const remainingTimeService = {
    setRemainingTime: t => subject.next({ value: t }),
    clearRemainingTime: () => subject.next(),
    getRemainingTime: () => subject.asObservable()
}

export default function TimeLeft() {
    const [data, error] = useDbData();
    const [locations, setLocations] = useState([])
    const user = "user1"

    useEffect(() => {
        if (data) {
            if (data.users[user]["adventure"]["locations"]) {
                setLocations(Object.values(data.users[user]["adventure"]["locations"]));
            } else {
                setLocations([]);
            }
        }
    }, [data])

    if (!data) {
        return <h1>Loading</h1>
    } 

    const startTime = Date.parse(data.users[user]["start time"])
    const endTime = Date.parse(data.users[user]["end time"])
    const freeTime = Math.abs(startTime - endTime) / 36e5;
    remainingTimeService.setRemainingTime(freeTime);

    const calculateTime = () => {
         // calculate remaining time
         let currRemainingTime = freeTime;
         locations.forEach(location => {
             if (location["selected"] && location.suggestedTime) currRemainingTime -= location.suggestedTime;
         })

         remainingTimeService.setRemainingTime(currRemainingTime)
         return currRemainingTime 
    }
    
    return (
        <div className="time-left-banner">
            <div className="start-adventure">Start building your adventure.</div>
            <div className="time-left">{calculateTime()} Hours Left</div>
        </div>
    )
}