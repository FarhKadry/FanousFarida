import React, { useState, useEffect } from 'react';
import './home.css'
import './story.css'
import './../animations.css'
import './../components/layout/header.css'
import depth from './../assets/depth2.svg'
import menu from './../assets/menu.svg'

import slide1 from './../assets/story1.jpg'
import slide2 from './../assets/story2.jpg'
import slide3 from './../assets/story3.jpg'
import slide4 from './../assets/story4.jpg'
import slide5 from './../assets/story5.jpg'
import slide6 from './../assets/story6.jpg'
import slide7 from './../assets/story7.png'


import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/button';
import IconBtn from '../components/common/iconbtn';
import Music from '../components/common/music';
const buildSlides = (handleNext, isLast) => [
  {
        autoDelay: 4000,
    render: (next, last) => (
      <>
        <img key={slide1} className='splashBg slide scaleStory' src={slide1} alt="" />
        <img className='splashBg' src={depth} alt="" />
        <div className="narration">
          كانت تتسحر عائلة فريدة في ليلة من ليال رمضان وسط أضواء الفوانيس 
          <div className="startBtnCont">
          <div onClick={next}><Button style1="primarybtn" cta="التالي" /></div>
        </div>
        </div>
        
      </>
    ),
  },
  {
    autoDelay: 6000,
    render: (next) => (
      <>
        <img style={{ scale: "2.5" , top:"280px" , left:"-27px"  }} key={slide3} className='splashBg slide' src={slide3} alt="" />

        <img key={slide2} className='splashBg slide scaleStory2' src={slide2} alt="" />

        <img className='splashBg' src={depth} alt="" />
        <div className=" light2 fadeOut"></div>
        <div className="narration">
             حين أطفأت رياح شريرة كل فوانيس 

              ! المحروسة 
          <div className="startBtnCont">
          <div onClick={next}><Button style1="primarybtn" cta="التالي" /></div>
        </div>
        </div>
        
      </>
    ),
  },
  {
    autoDelay: 2500,  
    render: () => (
      <>
        <img key={slide3} className='splashBg slide scaleStory3' src={slide3} alt="" />
        <img className='splashBg' src={depth} alt="" />
      </>
    ),
  },
  {
    autoDelay: 4000,
    render: (next) => (
      <>
        <img key={slide4} className='splashBg slide scaleStory4' src={slide4} alt="" />
        <div className=" light2 fadeOut"></div>

        <div className="narration narration2 moveIn">
          ماذا من صلاة الفجر؟ كيف نصل للمساجد في الظلام؟

          <div className="startBtnCont">
          <div onClick={next}><Button style1="primarybtn" cta="التالي" /></div>
        </div>
        </div>
      </>
    ),
  },
  {
    autoDelay: 4000,
    render: (next) => (
      <>
        <img key={slide4} className='splashBg slide' src={slide4} alt="" />

        <img key={slide5} className='splashBg slide scaleStory5' src={slide5} alt="" />
        <div className="narration narration2 narration3">
...          تبقى فانوس واحد به النور
           <div className="startBtnCont">
          <div onClick={next}><Button style1="primarybtn" cta="التالي" /></div>
        </div>
        </div>
       
      </>
    ),
  },
  {
    autoDelay: null,
    render: (next) => (
      <>
        <img key={slide6} className='splashBg slide scaleStory6' src={slide6} alt="" />
        <img key={slide6} className='splashBg slide scaleStory7 ' src={slide7} alt="" />

        <img className='splashBg' src={depth} alt="" />
        <div className="narration">
          علينا أن نعيد النور لمساجد المحروسة قبل الفجر....
          <div className="startBtnCont">
          <div onClick={next}><Button style1="primarybtn homeBtn" cta="ألعب الآن!" /></div>
        </div>
        </div>
      </>
    ),
  },
];

const Story = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step === buildSlides().length - 1) {
      navigate('/onboarding');
    } else {
      setStep(s => s + 1);
    }
  };

  const slides = buildSlides();
  const current = slides[step];

  useEffect(() => {
    if (current.autoDelay !== null) {
      const timer = setTimeout(handleNext, current.autoDelay);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div style={{ justifyContent: "end" }} className="fixed-mobile-wrapper">
      <header>
<div className="flex2">
        <IconBtn icon={menu} style1="iconbtnmian" link="/menu" />
        <Music />
</div>
        <Link to="/levels">
        <button className='submitbtn'>
          تخطي
        </button>
        </Link>
      </header>
      {current.render(handleNext)}
    </div>
  );
};

export default Story;