import React from 'react';
import './textbox.css';
const Textbox = (props) => {
    return ( <>
    <div className="textBox">
        <h3>{props.heading}</h3>
    <p>{props.text}</p>
    </div>
    </> );
}
 
export default Textbox;