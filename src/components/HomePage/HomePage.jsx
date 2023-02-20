import AdventurePage from "../AdventurePage/AdventurePage"
import LocationPage from "../LocationPage/LocationPage"
import TimeLeft from "../TimeLeft/TimeLeft"
import './HomePage.css'

export default function HomePage() {
    return (
        <div>
            <TimeLeft />
            <div className="main">
                <AdventurePage />
                <LocationPage city="Paris"/>
            </div>
        </div>
    )
}