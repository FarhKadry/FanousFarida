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
import IconBtn from '../components/common/iconbtn';
import Heading from '../components/common/heading';
const HowTo = () => {
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
        <nav className='menuPanel floatIn'>
            <Heading heading="القائمة" />
        <ul>
            <li style={{ animationDelay: '0.1s' }} className='floatIn'>
        <Button link="/home" style1="primarybtn secondarybtn" cta="الرئيسية" />
            </li>
            <li style={{ animationDelay: '0.2s' }} className='floatIn'>
        <Button link="/settings" style1="primarybtn secondarybtn" cta="الاعدادات " />
            </li>
            <li style={{ animationDelay: '0.3s' }} className='floatIn'>
        <Button link="/howto" style1="primarybtn secondarybtn" cta="كيف ألعب" />
            </li>
            
            <li style={{ animationDelay: '0.4s' }} className='floatIn'>
        <Button link="/story" style1="primarybtn secondarybtn" cta="القصة" />
            </li>
            
            <li style={{ animationDelay: '0.5s' }} className='floatIn'>
        <Button link="/levels" style1="primarybtn secondarybtn" cta="الأدوار" />
            </li>
        </ul>
    </nav>
        <img className='splashBg' src={splash} alt="" />
        <div className="startBtnCont startBtnAnim">
        </div>
    </div>
    
    
    </> );
}
 
export default HowTo;