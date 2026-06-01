import React from 'react';
import { Link } from 'react-router-dom';
import './button.css'

const Button = (props) => {
    return ( <>
    <Link to={props.link}>
    <button className={props.style1}>
    {props.cta}
    </button>
    </Link>
    </> );
}
 
export default Button;