const WaypointMap= ({ selectedLocations }) => {
    const waypoints = selectedLocations.slice(0, -1).map(str => `'${str.address}'`).join(' | ');
    
    return(
        <div>
        {selectedLocations=== undefined || selectedLocations.length ==0 ? <div></div> : 
        <div>
            {selectedLocations.length ==1 ? 
                <iframe
                        width = "100%"
                        height="300px"
                        src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyAres6dxJqN_EEzqHrFIXPHg4tGVuSLERA&origin="13 Rue du Mail, 75002 Paris, France"&destination=${selectedLocations[0].address}&mode=walking`}
                >       
                </iframe>
            : 
                <iframe
                        width = "100%"
                        height="300px"
                        src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyAres6dxJqN_EEzqHrFIXPHg4tGVuSLERA&origin="13 Rue du Mail, 75002 Paris, France"&destination=${selectedLocations[selectedLocations.length-1].address}&waypoints=${waypoints}&mode=walking`}
                >       
                </iframe>
            }
        </div>

    }
        </div>
    )
}


export default WaypointMap