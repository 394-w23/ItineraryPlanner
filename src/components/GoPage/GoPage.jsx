import WaypointMap from "../WaypointMap/WaypointMap"
import ProgressTimer from 'react-progress-bar-timer';

export default function GoPage() {
    return (
        <div>
            <div className="main" style={{ paddingTop: `60px`}}>
            <ProgressTimer
  direction="right"
  duration={100}
  label="3 hours left"
  onFinish={function noRefCheck(){}}
  rootRounded
  started={false}
  variant="fill"
 />
                <WaypointMap />
            </div>
        </div>
    )
}