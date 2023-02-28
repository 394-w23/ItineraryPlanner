import WaypointMap from "../WaypointMap/WaypointMap"
import ProgressTimer from 'react-progress-bar-timer';
import './GoPage.css'

export default function GoPage() {
    return (
        <div>
            <div style={{ paddingTop: `60px`}}>
            <ProgressTimer
  
  direction="right"
  duration={100}
  label="3 hours left"
  onFinish={function noRefCheck(){}}
  rootRounded
  started={false}
  variant="empty"
//   variant="fill"
    fontSize={"10px"}
  fontColor="#ffffff"
  color="#000000"
 />
                <WaypointMap page="go"/>
            </div>
        </div>
    )
}