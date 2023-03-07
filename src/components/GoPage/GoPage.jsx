import React, { useEffect, useState } from "react";
import WaypointMap from "../WaypointMap/WaypointMap"
import ProgressTimer from 'react-progress-bar-timer';
import './GoPage.css'
import { useDbData } from "../../utilities/firebase";

export default function GoPage() {
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

    const calculateTime = () => {
         // calculate remaining time
         let currRemainingTime = freeTime;
         locations.forEach(location => {
             if (location["selected"] && location.suggestedTime) currRemainingTime -= location.suggestedTime;
         })

         return currRemainingTime 
    }

    let timeLeft = calculateTime();
    let timeToHours = (freeTime) + " HOURS LEFT";

    return (
        <div>
            <div style={{ paddingTop: `60px`}}>
                <ProgressTimer
                    direction="right"
                    duration={(freeTime) * 3600}
                    label={timeToHours}
                    onFinish={function noRefCheck(){}}
                    started={false}
                    variant="empty"
                    fontSize={"10px"}
                    fontColor="#ffffff"
                    color="#262262"
                    />
                <WaypointMap page="go"/>
            </div>
        </div>
        )
    }