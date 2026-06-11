import React from 'react';
import './home.css'
import './../animations.css'
import './prewin.css'

import './../components/layout/header.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import depth from './../assets/onboardDepth.svg'
import fanous from './../assets/fanous_empty.png';
import pause from './../assets/pause.svg';

import menu from './../assets/menu.svg'

import character from './../assets/gameplaycharpress.png'
import character2 from './../assets/onboardchar.png'




import splash from './../assets/mosque1bg.jpg'
import Button from '../components/common/button';
import IconBtn from '../components/common/iconbtn';
import TapAnimation from '../components/common/tap';
import Music from '../components/common/music';
import Progress from '../components/common/progress';

const PreWin = () => {
    const starsCollected = parseInt(localStorage.getItem('lastStarsCollected') ?? '0', 10);

    return ( <>
     <div className="fixed-mobile-wrapper">
            
       <header>
                <div className="flex2">
                    <IconBtn icon={pause} style1="iconbtnmian" link="/pause" />
                    <Music />
                </div>
                <Progress counter={starsCollected} fanous={fanous} />
            </header>
        <img className='splashBg mosqueBg mosque1Anim' src={splash} alt="" />
        <img className='splashBg' src={depth} alt="" />
       <div className="floatIn narration prewinNarration">
            لقد اقتربنا من ابن طولون  

          <div className="startBtnCont">
        </div>
        </div>
        <img className='float prewinChar' src={character} alt="" />
        <div
    style={{ animationDelay: '0.3s', zIndex: '999999999' }}
    className="missonBtn floatIn"
    onClick={(e) => e.stopPropagation()}
>
</div>
    </div>
    </> );
}
export default PreWin;