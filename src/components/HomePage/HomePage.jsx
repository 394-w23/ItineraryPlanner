import AdventurePage from "../AdventurePage/AdventurePage"
import LocationPage from "../LocationPage/LocationPage"
import TimeLeft from "../TimeLeft/TimeLeft"

export default function HomePage() {
    return (
        <>
        <TimeLeft />
        <AdventurePage />
        <LocationPage city="Paris"/>
        </>
    )
}