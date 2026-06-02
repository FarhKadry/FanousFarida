import React from 'react';
import './home.css'
import './menu.css'
import { Link, Links, useNavigate } from 'react-router-dom';


import './../animations.css'
import './../components/layout/header.css'

import back from './../assets/back.svg'
import sound from './../assets/soundon.svg'
import sound2 from './../assets/soundoff.svg'
import home from './../assets/home.svg'
import music from './../assets/musicon.svg'
import music2 from './../assets/musicoff.svg'





import splash from './../assets/menuBg.jpg'
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
        <form>
            <div className="textFlex">
            <h4 className='h4_2'> اسمي</h4>
            <input className='input' type="text" placeholder='أدخل اسمك'   />
        </div>
        <button className="submitbtn" type='submit'>
            حفظ
        </button>
        </form>
        <div className="btnsFlex">
            <button style={{ animationDelay: '0.3s' }} className=' iconbtnmian iconSettings floatIn'>
        <img src={sound} alt="" />
    </button>
    <button style={{ animationDelay: '0.4s' }} className=' iconbtnmian iconSettings floatIn'>
        <img src={music} alt="" />
    </button>
     <Link to="/home">
     <button style={{ animationDelay: '0.5s' }} className=' iconbtnmian iconSettings floatIn'>
        <img src={home} alt="" />
    </button>
     </Link>
        </div>
    </div>
        <img className='splashBg' src={splash} alt="" />
        <div className="startBtnCont startBtnAnim">
        </div>
    </div>
    
    </> );
}
 
export default Settings;