import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import { useDbData } from "../../utilities/firebase";
import LocationCard from "../LocationCard/LocationCard";

export default function LocationPage() {

    const [data, error] = useDbData();
    const [locationData, setLocationData] = useState([])
    const city = "Paris"

    useEffect(() => {
        if (data) setLocationData(Object.values(data.locations[city]))
        console.log(data)
        console.log(locationData)
    }, [data])

    if (!data) {
        return <p>Loading</p>
    }

    console.log(Object.values(data.locations[city]))

    return (
       <div>
        {locationData.map((location, idx) => {
            <LocationCard key={idx} location={location} />
        })}
        {/* <LocationCard location={Object.values(data.locations[city])[0]}/> */}
       </div>
    );
}