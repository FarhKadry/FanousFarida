import React from 'react';
import './levelComp.css';
const LevelComp = (props) => {
    return ( <>
    <div className="levelComp">
        <h4>{props.name}</h4>
        <div className={props.style1}>
        {props.number}
        </div>
         </div>
  </>
        );}
        
        
export default LevelComp;