import React from 'react';
import './home.css'
import './story.css'

import './../animations.css'
import './../components/layout/header.css'
import depth from './../assets/depth2.svg'

import menu from './../assets/menu.svg'

import character from './../assets/charsplash2.png'


import slide1 from './../assets/story1.jpg'
import { Link } from 'react-router-dom';
import Button from '../components/common/button';
import IconBtn from '../components/common/iconbtn';

const Story = () => {
    return ( <>
    <div className="fixed-mobile-wrapper">
        <header>
    <IconBtn
        icon={menu}
        style1="iconbtnmian"
        link="/menu" />
        </header>
        <img className='splashBg slide' src={slide1} alt="" />
        <img className='splashBg' src={depth} alt="" />
        
        <div className="startBtnCont startBtnAnim">
        <Button link="/onboarding" style1="primarybtn " cta="التالي" />
        </div>
    </div>
    </> );
}
export default Story;