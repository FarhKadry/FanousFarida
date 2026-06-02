import React from 'react';
import './heading.css';
const Heading = (props) => {
    return ( <>
    <div className="headingBlock">
         <h1 className="bg1">
        {props.heading}
        </h1> <h1 className="bg2">
        {props.heading}
        </h1>
        <h1 className="bg3">
        {props.heading}
        </h1>
    </div>
    
    </> );
}
 
export default Heading;