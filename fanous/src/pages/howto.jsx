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
import Textbox from '../components/common/textbox';
const HowTo = () => {
    const navigate = useNavigate();
    return ( <>
        <div style={{ paddingTop: '50px' }} className="fixed-mobile-wrapper">
        <img className='splashBg' src={splash} alt="" />

        <header>
        <Link  onClick={(e) => {
        e.preventDefault(); navigate(-1);       
      }} to="#" >
    <button className="iconbtnmian ">
        <img src={back} alt="" />
    </button>
    </Link>
        </header>
        <div className="menuPanel floatIn">
        <Heading heading="كيف ألعب" />
        <div className="howtoFlex">
            <Textbox
            heading="اللعب"
            text="تقوم فريدة بالطيران عند لمسك للشاشة"
            />
        </div>
            <li style={{ animationDelay: '0.1s' }} className='floatIn'>
        <Button link="/home" style1="primarybtn" cta="التالي" />
            </li>
        <div className="startBtnCont startBtnAnim">
        </div>
        </div>
            
    </div>
    
    
    </> );
}
 
export default HowTo;