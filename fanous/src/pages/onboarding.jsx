import React from 'react';
import './home.css'
import './../animations.css'
import './../components/layout/header.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import depth from './../assets/onboardDepth.svg'

import menu from './../assets/menu.svg'

import character from './../assets/onboardchar.png'


import splash from './../assets/onboardbg.png'
import Button from '../components/common/button';
import IconBtn from '../components/common/iconbtn';
import TapAnimation from '../components/common/tap';

const Onboarding = () => {
       const navigate = useNavigate();
    const [started, setStarted] = useState(false);

    const handleStart = () => {
        setStarted(true);
    };

    useEffect(() => {
        if (!started) return;
        const timer = setTimeout(() => {
            navigate('/gameplay1');
        }, null);
        return () => clearTimeout(timer);
    }, [started, navigate]);

    return ( <>
     <div onClick={handleStart} className="fixed-mobile-wrapper">
             {!started && (
                            <div className="tapOverlay" onClick={handleStart}>
                            اضغط للبدء
                            </div>
                        )}
        <header>
    <IconBtn
        icon={menu}
        style1="iconbtnmian"
        link="/menu" />
        </header>
        <img className='splashBg ' src={splash} alt="" />
        <img className='splashBg' src={depth} alt="" />
       <div className='floatIn'>
         <h2 style={{ animationDelay: '0.1s' }} className='onboardText flicker'> اضغط الشاشة  للبدأ! </h2>
        <TapAnimation />
       </div>
        <img  style={{ animationDelay: '0.2s' }} className='floatIn onboardChar' src={character} alt="" />
        <div  style={{ animationDelay: '0.3s' }} className="missonBtn floatIn">
        <Button link="/gameplay1" style1="primarybtn " cta="مهمتي " />
        </div>
    </div>
    </> );
}
export default Onboarding;