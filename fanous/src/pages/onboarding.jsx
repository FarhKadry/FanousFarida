import React from 'react';
import './home.css'
import './../animations.css'
import './../components/layout/header.css'
import top from './../assets/logo/top.svg'
import bottom from './../assets/logo/bottom.svg'
import fanous from './../assets/logo/fanous.svg'
import depth from './../assets/depth2.svg'

import farida from './../assets/logo/farida.svg'
import starz from './../assets/logo/starz 2.svg'
import menu from './../assets/menu.svg'

import starshine from './../assets/logo/star shine.svg'
import character from './../assets/onboardchar.png'


import splash from './../assets/onboardbg.png'
import { Link } from 'react-router-dom';
import Button from '../components/common/button';
import IconBtn from '../components/common/iconbtn';
import TapAnimation from '../components/common/tap';

const Onboarding = () => {
    return ( <>
    <div className="fixed-mobile-wrapper">
        <header>
    <IconBtn
        icon={menu}
        style1="iconbtnmian"
        link="/menu" />
        </header>
        <img className='splashBg ' src={splash} alt="" />
        <img className='splashBg' src={depth} alt="" />
        {/* <img src={logo} alt='' /> */}
        <TapAnimation />
        <h2> اضغط الشاشة  للبدأ! </h2>
        <img className='charSplash' src={character} alt="" />
        <div className="startBtnCont startBtnAnim">
        <Button link="/gameplay1" style1="primarybtn " cta="مهمتي " />
        </div>
    </div>
    </> );
}
export default Onboarding;