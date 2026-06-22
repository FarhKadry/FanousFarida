import React from 'react';
import './progress.css'
const Progress = (props) => {
    return ( <>
    <div className="progress">
        {props.counter} <span className={props.over}>   / </span> {props.counter2}  
        <img src={props.fanous} alt="" />
    </div>
    </> );
}
 
export default Progress;