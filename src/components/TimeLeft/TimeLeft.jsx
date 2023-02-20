import './TimeLeft.css'
import ProgressTimer from 'react-progress-bar-timer';

const TimerComponent = () => (
    
<ProgressTimer
  direction="left"
  duration={60*60}
  label="3 hours left"
  onFinish={function noRefCheck(){}}
  rootRounded
  started={true}
  variant="fill"
 />
  );
export default function TimeLeft() {
    
    return (
        <div className="time-left-banner">
        <h4 className="time-left">Based on your selections you have 3 hours left</h4>
        <TimerComponent />
        </div>
    )
}