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
import stars from './../assets/fanous progress.png'
import star from './../assets/shootingstar1.png'
import fix from './../assets/fixframe.png'




import Button from '../components/common/button';
import Heading from '../components/common/heading';
import Textbox from '../components/common/textbox';
import TapAnimation from '../components/common/tap';

const slides = [
  {
    key: 'play',
    content: (char) => (
      <>
        <div className="howtoFlex">
          <TapAnimation />
          <Textbox heading="اللعب" text="تقوم فريدة بالطيران عند لمسك للشاشة" />
        </div>
        <div className="chacrCont">
          <img className='float' src={char} alt="" />
        </div>
      </>
    ),
    btnStyle: 'primarybtn',
    btnCta: 'التالي',
  },
  {
    key: 'collect',
    content: () => (
      <>
        <div className="howtoFlex">
          <Textbox heading="! جمع  " text="عليك أن تجمع الشهب لتكمل ثلاث نجوم مضيئة لفانوس فريدة" />
        </div>
        <div className="flex2">
            <img src={star} alt="" />
            <img src={stars} alt="" />

          </div>
        <div className="howtoFlex floatIn" style={{ marginTop: '16px' }}>
          <img  style={{ marginRight: '10px' }} className='float' src={bat} alt="" />
          <Textbox heading="! انتبه  " text="الوطاويط تحب الظلام." />
        </div>
      </>
    ),
    btnStyle: 'primarybtn',
    btnCta: 'التالي',
  },
  {
    key: 'fix',
    content: () => (
      <>
        <div className="howtoFlex" style={{ marginTop: '12px' }}>
        <img  style={{ width: '97px' }} src={air} alt="" />

          <Textbox heading="انتبه !" text="فالرباح تطفئ أنوار الفوانيس!" />
        </div>
        <div className="howtoFlex" style={{ marginTop: '16px' }}>
        <img style={{ width: '70px' }} src={fix} alt="" />
          <Textbox heading="أصلح" text="بعض الأدوار تطلب منك إصلاح الفانوس!" />
        </div>
      </>
    ),
    btnStyle: 'primaryBtn homeBtn',
    btnCta: 'ألعب الآن!',
  },
];

const HowTo = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const currentSlide = slides[step];
  const isLast = step === slides.length - 1;

  const handleNext = () => {
    if (isLast) {
      navigate('/home');
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
        <div className="menuPanel howToPanel floatIn">
          <Heading heading="كيف ألعب" />
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

export default HowTo;