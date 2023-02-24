import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Image, Button } from "react-bootstrap";
import { useDbData } from "../../utilities/firebase";
import AdventureCard from "../AdventureCard/AdventureCard";
import WaypointMap from "../WaypointMap/WaypointMap";
import '../AdventurePage/AdventurePage.css'
import { useNavigate } from "react-router-dom";


export default function AdventurePage() {
    const [data, error] = useDbData();
    const [selectedLocations, setSelectedLocations] = useState([])
    const user = "user1"

    const navigate = useNavigate();

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
    return (
        <>
            <WaypointMap selectedLocations={selectedLocations}/>
            <h3 style={{padding:"10px"}}>My Selected Options</h3>
            {/* <div style={{width: "auto"}}>
            
            <Button  
                onClick={handleGoClick} 
                variant="success" 
                size="lg"
                disabled={selectedLocations.length==0}
                style={{width: "90%"}}
            >
                Go
            </Button>
            </div> */}
            <div className="adventure-cards">
            {selectedLocations.length > 0 && selectedLocations.map((location, id) => (
                <div key={id}>
                    <AdventureCard location={location} />
                </div>
            ))}
            </div>
        </>
        
    );
}
