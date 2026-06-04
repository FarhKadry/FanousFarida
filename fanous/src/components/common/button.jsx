import React from 'react';
import { Link } from 'react-router-dom';
import './button.css';
import popFile from './../../assets/audio/pop.mp3';

const pop = new Audio(popFile);

const Button = (props) => {
    const handleClick = () => {
        pop.currentTime = 0;
        pop.play();
    };

    return (
        <Link id="link" to={props.link}>
            <button className={props.style1} onClick={handleClick}>
                {props.cta}
            </button>
        </Link>
    );
};

export default Button;