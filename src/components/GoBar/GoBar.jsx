import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import './GoBar.css'


export default function GoBar() {
    const handleGoClick = () => {
        navigate("/go");
    }

    return (
        <div className="gobar-footer">
            <Button  
                onClick={handleGoClick} 
                size="sm"
                style={{width: "100%", height: "50px"}}
                className="start-button"
            >
                Start My Adventure
            </Button>
        </div>
    )
}