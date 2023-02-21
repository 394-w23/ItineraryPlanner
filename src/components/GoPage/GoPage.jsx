import WaypointMap from "../WaypointMap/WaypointMap"
import ProgressTimer from 'react-progress-bar-timer';

export default function GoPage() {
    return (
        <div>
            <div className="main">
                <ProgressTimer
                    barRounded
                    buttonText=""
                    classes={{}}
                    fontSize={15}
                    color="#2f2d2d"
                    duration={60}
                    fontColor="#ffffff"
                    label="Time remaining
                    "
                    onFinish={function noRefCheck(){}}
                    showDuration
                    started
                    variant="fill"
                />
                <WaypointMap />
            </div>
        </div>
    )
}