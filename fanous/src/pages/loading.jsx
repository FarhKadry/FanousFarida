import React from 'react';
import './home.css'
import './levels.css'
import './loading.css'

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

import splash from './../assets/splashbg.jpg'
import { Link } from 'react-router-dom';
import Button from '../components/common/button';
import IconBtn from '../components/common/iconbtn';

const Loading = () => {
    return ( <>
    <div className="fixed-mobile-wrapper">
        <img className='splashBg bg2' src={splash} alt="" />
       <div className="splashBg depth depth2"></div>
       <div className="loadingFanous">
        
       </div>
        {/* <img src={logo} alt='' /> */}
        
    </div>
    </> );
}
 
export default Loading;