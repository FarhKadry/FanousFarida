import React from 'react';
import './levelComp.css';
import { Link } from 'react-router-dom';
const LevelComp = (props) => {
    return ( <>
    <div className={props.cont}>
        <div className="light scaleIn"></div>
        <Link to={props.link} id="link">
        <button className={props.stylepos}>
        <h4 className='h4dropShadow'>{props.name}</h4>
        <div className={props.style1}>
        {props.number}
        </div>
    </button>
        </Link>
    </div>
  </>
        );}
        
        
export default LevelComp;