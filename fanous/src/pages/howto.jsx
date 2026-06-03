import React from 'react';
import './home.css'
import './menu.css'
import { Link, useNavigate } from 'react-router-dom';


import './../animations.css'
import './../components/layout/header.css'


import back from './../assets/back.svg'
import char from './../assets/farida flying.png'




import splash from './../assets/menuBg.jpg'
import Button from '../components/common/button';
import IconBtn from '../components/common/iconbtn';
import Heading from '../components/common/heading';
import Textbox from '../components/common/textbox';
import TapAnimation from '../components/common/tap';
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
        <div className="menuPanel howToPanel floatIn">
        <Heading heading="كيف ألعب" />
        <div className="howtoFlex">
            <TapAnimation />
            <Textbox
            heading="اللعب"
            text="تقوم فريدة بالطيران عند لمسك للشاشة"
            />
        </div>
        <div className="chacrCont">
                <img className='float' src={char} alt="" />
        </div>
                    <li style={{ animationDelay: '0.1s' }} className='floatIn'>
                <Button link="/home" style1="primarybtn" cta="التالي" />
                    </li>
       
        </div>
            
    </div>
    
    
    </> );
}
 
export default HowTo;