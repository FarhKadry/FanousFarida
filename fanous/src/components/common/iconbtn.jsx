import React from 'react';
import { Link } from 'react-router-dom';
import './iconbtn.css';

const IconBtn = (props) => {
    return ( <>
    <Link to={props.link}>
    <button className={props.style1}>
        <img src={props.icon} alt="" />
    </button>
    </Link>
    </> );
}
 
export default IconBtn;