import AdventurePage from "../AdventurePage/AdventurePage"
import TimeLeft from "../TimeLeft/TimeLeft"
import GoBar from "../GoBar/GoBar"
import './HomePage.css'
import WaypointMap from "../WaypointMap/WaypointMap";

export default function HomePage() {
    return (
        <div>
            <TimeLeft />
            <WaypointMap page="home"/>
            <div className="main">
                <AdventurePage />
            </div>
            <GoBar/>
        </div>
    )
}