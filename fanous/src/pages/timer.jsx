import React from 'react';
import './timer.css'
const Timer = (props) => {
    return ( <>
    <div className="timer">
    {props.time}
    <span>
            ثانية
        </span>
    </div>
    </> );
}
 
export default Timer;