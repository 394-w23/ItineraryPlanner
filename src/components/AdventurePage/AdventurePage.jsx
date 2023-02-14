import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import { useDbData } from "../../utilities/firebase";
import AdventureCard from "../AdventureCard/AdventureCard";

export default function AdventurePage() {
    const [data, error] = useDbData();
    const [adventureData, setAdventureData] = useState([])

    useEffect(() => {
        console.log(data)
        if (data) setAdventureData(Object.values(data.adventures))
    }, [data])

    if (!data) {
        return <p>Loading</p>
    }

    return (
       <div>
        {adventureData.map((adventure, idx) => (
            <AdventureCard key={idx} adventure={adventure} />
        ))}
       </div>
    );
}