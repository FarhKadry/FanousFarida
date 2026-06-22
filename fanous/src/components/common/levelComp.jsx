import React from 'react';
import './levelComp.css';
import { Link } from 'react-router-dom';
import { setSelectedLevel } from '../../utils/progress';

const LevelComp = (props) => {
    const handleClick = () => {
        if (props.link) {
            setSelectedLevel(Number(props.number));
        }
    };

    return ( <>
    <div className={props.cont}>
        <div className="light scaleIn"></div>
        <Link id="levelLink" to={props.link} id="link" onClick={handleClick}>
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