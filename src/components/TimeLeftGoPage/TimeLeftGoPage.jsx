import React, { useEffect, useState } from "react";
import { useDbData } from "../../utilities/firebase";
import { Subject } from 'rxjs';
import './TimeLeft.css'
import ProgressTimer from 'react-progress-bar-timer';

const TimerComponent = () => (
    
<ProgressTimer
  direction="left"
  duration={500}
  label="3 hours left"
  onFinish={function noRefCheck(){}}
  rootRounded
  started={true}
  variant="fill"
 />
  );

// 
const subject = new Subject()
export const remainingTimeService = {
    setRemainingTime: t => subject.next({ value: t }),
    clearRemainingTime: () => subject.next(),
    getRemainingTime: () => subject.asObservable()
}

export default function TimeLeftGoPage() {
    // hard code 5.5 hours
    
    return (
        <div className="time-left-banner">
            <div className="time-left">Adventure Progress: 05:24:12</div>
        </div>
    )
}