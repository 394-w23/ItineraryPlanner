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
        console.log(data)
        if (data) setAdventureData(Object.values(data.adventures[adventure]["locations"]))
    }, [data])

    if (!data) {
        return <p>Loading</p>
    }
    console.log("setAdventureData", setAdventureData)
    return (
        <>
            <h1>My Adventure</h1>
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