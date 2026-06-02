import React from 'react';
import './home.css'
import './menu.css'
import { Link, useNavigate } from 'react-router-dom';


import './../animations.css'
import './../components/layout/header.css'

import menu from './../assets/menu.svg'

import back from './../assets/back.svg'



import splash from './../assets/menuBg.jpg'
import Button from '../components/common/button';
import panelchar from './../assets/panelchar.png';
import Heading from '../components/common/heading';

const Settings = () => {
      const navigate = useNavigate();
    return ( <>
    
    <div style={{ paddingTop: '50px' }} className="fixed-mobile-wrapper">
        <header>
        <Link  onClick={(e) => {
        e.preventDefault(); navigate(-1);       
      }} to="#" >
    <button className="iconbtnmian ">
        <img src={back} alt="" />
    </button>
    </Link>
        </header>
        <div className='menuPanel pausePanel floatIn'>
            <Heading heading="الإعدادات" />
            <img className='panelChar scaleIn' src={panelchar} alt="" />
        
        <div className="btnsFlex">
            <button style={{ animationDelay: '0.3s' }} className=' iconbtnmian floatIn'>
        <img src={back} alt="" />
    </button>
    <button style={{ animationDelay: '0.4s' }} className=' iconbtnmian floatIn'>
        <img src={back} alt="" />
    </button>
     <button style={{ animationDelay: '0.5s' }} className=' iconbtnmian floatIn'>
        <img src={back} alt="" />
    </button>
        </div>
    </div>
        <img className='splashBg' src={splash} alt="" />
        <div className="startBtnCont startBtnAnim">
        </div>
    </div>
    
    </> );
}
 
export default Settings;