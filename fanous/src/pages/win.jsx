import React from 'react';
import './home.css'
import './win.css'

import './../animations.css'
import './../components/layout/header.css'
import top from './../assets/wintypo2.svg'
import star from './../assets/goldstar.svg'
import fanous from './../assets/wintypo1.svg'
import depth from './../assets/gendepth.svg'
import count1 from './../assets/collectedcount-1.png'
import count2 from './../assets/collectedcount.png'


import menu from './../assets/menu.svg'

import starshine from './../assets/logo/star shine.svg'
import character from './../assets/winchar.png'


import splash from './../assets/win11.jpg'
import rays from './../assets/win2.png'

import { Link } from 'react-router-dom';
import Button from '../components/common/button';
import IconBtn from '../components/common/iconbtn';
import Music from '../components/common/music';

const Win = () => {
    return ( <>
    <div className="fixed-mobile-wrapper">
        <header>
    <IconBtn
        icon={menu}
        style1="iconbtnmian"
        link="/menu" />
        <Music />
        </header>
        <img className='splashBg winScale ' src={splash} alt="" />
        <img className='splashBg winRays winRaysScale' src={rays} alt="" />
        <img className='splashBg winDepth' src={depth} alt="" />
        <img className='charWin ' src={character} alt="" />
        <div className="menuPanel winPanel VerticalScale">
            <div className="winStars">
        <img style={{"left" : "20px", "animationDelay" : "1s"}} className='starsmall rotateIn' src={star} alt="" />
        <img style={{ "animationDelay" : "0.9s"}} className='starbig rotateIn' src={star} alt="" />
        <img  style={{"right" : "20px" ,  "animationDelay" : "1s"}}  className='starsmall rotateIn' src={star} alt="" />
        </div>
<div className="logo winTypo">
        <img className='top scaleIn4' src={top} alt="" />
        <img className=' scaleIn3' src={fanous} alt="" />
        </div>
        <div className="flex2">
            <div className="flex2 collectionflex1">
                <img className='collectionicon' src={count1} alt="" />
                <h2>12</h2>
            </div>
            <div className="flex2 collectionflex2">
                <img className="collectionicon"  src={count2} alt="" />
                <h2>22</h2>

            </div>
        </div>
        <div className="startBtnCont startBtnAnim">
        <Button link="/onboarding" style1="primarybtn secondarybtn" cta="   العب مجددا" />
        <Button link="/onboarding" style1="primarybtn" cta="   التالي " />
        </div>
        </div>
        {/* <img src={logo} alt='' /> */}
        
    </div>
    </> );
}
export default Win;