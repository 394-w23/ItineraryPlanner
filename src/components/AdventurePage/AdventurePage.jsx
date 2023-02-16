import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import { useDbData } from "../../utilities/firebase";
import AdventureCard from "../AdventureCard/AdventureCard";
import '../AdventurePage/AdventurePage.css'


export default function AdventurePage() {
    const [data, error] = useDbData();
    const [adventureData, setAdventureData] = useState([])
    const adventure = "adventure-id-1"

    useEffect(() => {
        if (data) setAdventureData(Object.values(data.adventures[adventure]["locations"]))
    }, [data])

    if (!data) {
        return <p>Loading</p>
    }
    return (
        <>
            <h1>My Selected Options</h1>
            <div className="adventure-cards">
            {adventureData.map((adventureLocation, idx) => (
                <div>
                <AdventureCard key={idx} adventureLocation={adventureLocation} />
                </div>
            ))}
            </div>
        </>
        
    );
}