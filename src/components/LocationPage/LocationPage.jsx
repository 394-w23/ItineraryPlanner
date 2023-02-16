import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import { useDbData } from "../../utilities/firebase";
import LocationCard from "../LocationCard/LocationCard";
import './LocationPage.css'


export default function LocationPage() {
    const [data, error] = useDbData();
    const [remainingLocations, setRemainingLocations] = useState([])
    const user = "user1"

    useEffect(() => {
        if (data) setRemainingLocations(Object.values(data.users[user]["adventure"]["remainingLocations"]))
    }, [data])

    if (!data) {
        return <p>Loading</p>
    }

    return (
        <>
            <h1>My Remaining Options</h1>
            <div className="location-cards">
            {remainingLocations.map((location, idx) => (
            <div key={location.id}>
                <LocationCard location={location} />
            </div>
            ))}
            </div>
        </>
       

    );
}