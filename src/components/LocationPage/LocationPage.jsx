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
        if (data) {
            if (data.users[user]["adventure"]["remainingLocations"]) {
            setRemainingLocations(Object.values(data.users[user]["adventure"]["remainingLocations"]))
            } else {
                setRemainingLocations([])
            }
        }
    }, [data])

    if (!data) {
        return <p>Loading</p>
    }

    return (
        <>
            <h3>My Remaining Options</h3>
            <div className="location-cards">
            {remainingLocations.length > 0 && remainingLocations.map((location, idx) => (
            <div key={location.id}>
                <LocationCard location={location} />
            </div>
            ))}
            </div>
        </>
       

    );
}