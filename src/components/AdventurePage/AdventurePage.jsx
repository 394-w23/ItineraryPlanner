import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import { useDbData } from "../../utilities/firebase";
import AdventureCard from "../AdventureCard/AdventureCard";
import WaypointMap from "../AdventurePage/WaypointMap";
import '../AdventurePage/AdventurePage.css'


export default function AdventurePage() {
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
    // console.log("selectedLocations", selectedLocations)
    return (
        <>
            <h3 style={{padding:"10px"}}>My Selected Options</h3>
            <div className="adventure-cards">
            <WaypointMap selectedLocations={selectedLocations}/>
            {selectedLocations.length > 0 && selectedLocations.map((location) => (
                <div key={location.id}>
                    <AdventureCard location={location} />
                </div>
            ))}
            </div>
        </>
        
    );
}