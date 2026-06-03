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

import { useNavigate } from 'react-router-dom';
import Button from '../components/common/button';
import IconBtn from '../components/common/iconbtn';

// ─── EDIT SLIDES HERE ───────────────────────────────────────────────
const slides = [
  {
    image: slide1,
    content: (
      <div className="narration">
        كانت تتسحر عائلة فريدة في ليلة من ليال رمضان وسط أضواء الفوانيس ....
      </div>
    ),
  },
  {
    image: slide2,
    content: (
      <div className="narration">
        حين أطفأت رياح شريرة كل الفوانيس المحروسة !
      </div>
    ),
  },
  {
    image: slide3,
    content: null,       // no narration — auto-advances after autoDelay ms
    autoDelay: 2500,
  },
  {
    image: slide4,
    content: (
      <div className="narration">
        ماذا من صلاة الفجر؟ كيف نصل للمساجد في الظلام؟
      </div>
    ),
  },
  {
    image: slide5,
    content: (
      <div className="narration">
        ذبقى فانوس واحد به النور...
      </div>
    ),
  },
  {
    image: slide6,
    content: (
      <div className="narration">
        علينا أن نعيد النور لمساجد المحروسة قبل الفجر....
      </div>
    ),
    isLast: true,
  },
];
// ────────────────────────────────────────────────────────────────────

const Story = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const current = slides[step];

  const handleNext = () => {
    if (current.isLast) {
      navigate('/onboarding');
    } else {
      setStep(s => s + 1);
    }
  };

  useEffect(() => {
    if (current.content === null) {
      const timer = setTimeout(handleNext, current.autoDelay ?? 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="fixed-mobile-wrapper">
      <header>
        <IconBtn icon={menu} style1="iconbtnmian" link="/menu" />
      </header>

      <img
        key={current.image}
        className='splashBg slide scaleStory'
        src={current.image}
        alt=""
      />
      <img className='splashBg' src={depth} alt="" />

      {current.content !== null && (
        <>
          {current.content}
          <div className="startBtnCont">
            <div onClick={handleNext}>
              <Button
                style1={current.isLast ? 'goldbtn' : 'primarybtn'}
                cta={current.isLast ? 'ألعب الآن!' : 'التالي'}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Story;