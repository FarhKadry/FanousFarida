import React from 'react';
import { Link } from 'react-router-dom';
import './iconbtn.css';
import popFile from './../../assets/audio/pop.mp3';

const pop = new Audio(popFile);

const IconBtn = (props) => {
    const handleClick = (e) => {
        pop.currentTime = 0;
        pop.play();
        if (props.func) props.func(e);
    };

    return (
        <Link onClick={handleClick} to={props.link}>
            <button className={props.style1}>
                <img src={props.icon} alt="" />
            </button>
        </Link>
    );
};

export default IconBtn;