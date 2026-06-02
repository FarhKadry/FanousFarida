import React from 'react';
import './home.css'
import './menu.css'

import './../animations.css'
import './../components/layout/header.css'

import menu from './../assets/menu.svg'

import character from './../assets/charsplash2.png'


import splash from './../assets/menuBg.jpg'
import Button from '../components/common/button';
import IconBtn from '../components/common/iconbtn';
import Heading from '../components/common/heading';

const Menu = () => {
    return ( <>
    <div className="fixed-mobile-wrapper">
        <header>
    <IconBtn
        icon={menu}
        style1="iconbtnmian startBtnAnim"
        link="/menu"
        />
        </header>
        <nav className='menuPanel'>
            <Heading heading="القائمة" />
        <ul>
            <li>
        <Button style1="primarybtn secondarybtn" cta="ألعب الأن" />
        <Button style1="primarybtn" cta="ألعب الأن" />
        <Button style1="primarybtn" cta="ألعب الأن" />
        <Button style1="primarybtn" cta="ألعب الأن" />
            </li>
        </ul>
    </nav>
        <img className='splashBg' src={splash} alt="" />
        <div className="startBtnCont startBtnAnim">
        </div>
    </div>
    
    </> );
}
 
export default Menu;