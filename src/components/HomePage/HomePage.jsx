import AdventurePage from "../AdventurePage/AdventurePage"
import LocationPage from "../LocationPage/LocationPage"
import TimeLeft from "../TimeLeft/TimeLeft"
import GoBar from "../GoBar/GoBar"
import './HomePage.css'
import WaypointMap from "../WaypointMap/WaypointMap";

export default function HomePage() {
    return (
        <div>
            <TimeLeft />
            <WaypointMap/>
            <div className="main">
                <AdventurePage />
                <LocationPage city="Paris"/>
            </div>
            <GoBar/>
        </div>
    )
}