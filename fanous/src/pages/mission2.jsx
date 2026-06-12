import React, { useState } from 'react';
import './home.css'
import './menu.css'
import { Link, useNavigate } from 'react-router-dom';
import './../animations.css'
import './../components/layout/header.css'

import back from './../assets/back.svg'
import char from './../assets/farida flying.png'
import splash from './../assets/menuBg.jpg'
import air from './../assets/wind.gif'

import bat from './../assets/bat1.png'
import stars from './../assets/fanousprogress.png'
import star from './../assets/shootingstar1.png'
import fix from './../assets/fixframe.png'




import Button from '../components/common/button';
import Heading from '../components/common/heading';
import Textbox from '../components/common/textbox';
import TapAnimation from '../components/common/tap';
import Timer from '../components/common/timer';

const slides = [
  {
    key: 'collect',
    content: () => (
      <>
        <div className="howtoFlex ">
          <div className="flex2">
            {/* <img style={{ objectFit: 'contain', width: '100px' }} src={star} alt="" /> */}
             
          <Textbox heading="! جمع  " text="   جمع ثمان شهب في 60 ثانية" />
          </div>
        </div>
        <div className="flex2">
<div style={{ position: 'relative' , bottom: 'unset' , right: 'unset' , fontSize: '40px' }} className="timer">
            60 <span>ثانية</span>
          </div>
            <img src={stars} alt="" />
          </div>
        <div className="howtoFlex floatIn" style={{ margin: '16px 0 26px 0' }}>
          <img  style={{ marginRight: '10px' }} className='float' src={bat} alt="" />
          <Textbox heading="! انتبه  " text="الوطاويط تحب الظلام." />
        </div>
      </>
    ),
    btnStyle: 'secondarybtn',
    btnCta: 'عودة للعب',
  },
  // {
  //   key: 'fix',
  //   content: () => (
  //     <>
  //       <div className="howtoFlex" style={{ marginTop: '12px' }}>
  //       <img  style={{ width: '97px' }} src={air} alt="" />

  //         <Textbox heading="انتبه !" text="فالرباح تطفئ أنوار الفوانيس!" />
  //       </div>
  //       <div className="howtoFlex" style={{ marginTop: '16px' }}>
  //       <img style={{ width: '70px' }} src={fix} alt="" />
  //         <Textbox heading="أصلح" text="بعض الأدوار تطلب منك إصلاح الفانوس!" />
  //       </div>
  //     </>
  //   ),
  //   btnStyle: 'primaryBtn homeBtn',
  //   btnCta: 'ألعب الآن!',
  // },
];

const Mission2 = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const currentSlide = slides[step];
  const isLast = step === slides.length - 1;

  const handleNext = () => {
    if (isLast) {
      navigate('/onboarding');
    } else {
      setStep(s => s + 1);
    }
  };

  return (

    
    <>
      <div style={{ paddingTop: '50px' }} className="fixed-mobile-wrapper">
        <img className='splashBg' src={splash} alt="" />
        <header>
          <Link onClick={(e) => { e.preventDefault(); navigate(-1); }} to="#">
            <button className="iconbtnmian">
              <img src={back} alt="" />
            </button>
          </Link>
        </header>
        <div className="menuPanel  floatIn">
          <Heading heading="مهمتي " />
          {currentSlide.content(char)}
  <div style={{ animationDelay: '0.1s' }} className='floatIn' onClick={handleNext}>
    <Button
      style1={currentSlide.btnStyle}
      cta={currentSlide.btnCta}
    />
  </div>
        </div>
      </div>
    </>
  );
};

export default Mission2;