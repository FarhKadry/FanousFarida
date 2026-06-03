import React from 'react';
import './home.css'
import './levels.css'
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
import character from './../assets/charsplash2.png'


import splash from './../assets/levelsbg.jpg'
import { Link } from 'react-router-dom';
import Button from '../components/common/button';
import IconBtn from '../components/common/iconbtn';
import LevelComp from '../components/common/levelComp';

const Levels = () => {
    return ( <>
    <div className="fixed-mobile-wrapper">
        <header>
    <IconBtn
        icon={menu}
        style1="iconbtnmian"
        link="/menu" />
        </header>
        <img className='splashBg levelsBg' src={splash} alt="" />
        <div className="splashBg depth"></div>
<LevelComp 
cont="lvlBg lvl1 floatIn"
stylepos="levelComp glow"
style1="levelCont current"
name=" ابن طولون"
number="1"
/>
<LevelComp 
cont="lvlBg lvl2 levelCompInactive"
stylepos="levelComp  floatIn"
style1="levelCont inactive"
name=" المرسي ابو العباس "
number="2"
/>
<LevelComp 
cont="lvlBg lvl3 levelCompInactive"
stylepos="levelComp floatIn "
style1="levelCont inactive"
name=" القلعة"
number="3"
/>
<LevelComp 
cont="lvlBg lvl4 levelCompInactive"
stylepos="levelComp  floatIn"
style1="levelCont inactive"
name="  ياقوت
العرش"
number="4"
/>
<LevelComp 
cont="lvlBg lvl5 levelCompInactive"
stylepos="levelComp floatIn "
style1="levelCont inactive"
name=" الأزهر "
number="5"
/>
    </div>
    </> );
}
export default Levels;