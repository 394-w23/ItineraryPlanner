import React, { useEffect, useState } from "react";
import { useDbData } from "../../utilities/firebase";
import AdventureCard from "../AdventureCard/AdventureCard";
import '../AdventurePage/AdventurePage.css'


export default function AdventurePage() {
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
        return <p>Loading</p>
    }
    return (
        <>
            <h3 style={{padding:"10px"}}>My Selected Options</h3>
            <div className="adventure-cards">
            {locations.length > 0 && locations.map((location) => (
                <div key={location.id}>
                    <AdventureCard location={location} />
                </div>
            ))}
            </div>
        </>
        
    );
}