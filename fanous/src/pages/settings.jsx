import React, { useState, useEffect } from 'react';
import './home.css'
import './menu.css'
import { Link, useNavigate } from 'react-router-dom';

import './../animations.css'
import './../components/layout/header.css'

import back from './../assets/back.svg'
import sound from './../assets/soundon.svg'
import sound2 from './../assets/soundoff.svg'
import home from './../assets/home.svg'
import music from './../assets/musicon.svg'
import music2 from './../assets/musicoff.svg'

import splash from './../assets/menuBg.jpg'
import panelchar from './../assets/panelchar.png';
import Heading from '../components/common/heading';
import Music from '../components/common/music';

const Settings = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [savedName, setSavedName] = useState('');
  const [saved, setSaved] = useState(false);

  // LOCAL STORAGE
  useEffect(() => {
    const stored = localStorage.getItem('userName');
    if (stored) {
      setName(stored);
      setSavedName(stored);
    }
  }, []);

  const isDirty = name !== savedName;

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', name);
    setSavedName(name);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <>
      <div style={{ paddingTop: '50px' }} className="fixed-mobile-wrapper">
        <header>
          <Link
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            to="#"
          >
            <button className="iconbtnmian">
              <img src={back} alt="" />
            </button>
          </Link>
        </header>

        <div className='menuPanel pausePanel floatIn'>
          <Heading heading="الإعدادات" />
          <img className='panelChar scaleIn' src={panelchar} alt="" />

          <form onSubmit={handleSave}>
            <div className="textFlex">
              <h4 className='h4_2'>اسمي</h4>
              <input
                className='input'
                type="text"
                placeholder='أدخل اسمك'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSaved(false);
                }}
              />
            </div>

            {isDirty && (
              <button className="submitbtn" type='submit'>
                حفظ ✓
              </button>
            )}

            {saved && !isDirty && (
              <p style={{ textAlign: 'center', color: 'green', marginTop: '8px' }}>
                ✓ تم حفظ الاسم
              </p>
            )}
          </form>

          <div className="btnsFlex">
            <button style={{ animationDelay: '0.3s' }} className='iconbtnmian iconSettings floatIn'>
              <img src={sound} alt="" />
            </button>
            <div style={{ animationDelay: '0.4s' }} >
              <Music />
            </div>
            <Link to="/home">
              <button style={{ animationDelay: '0.5s' }} className='iconbtnmian iconSettings floatIn'>
                <img src={home} alt="" />
              </button>
            </Link>
          </div>
        </div>
        <img className='splashBg' src={splash} alt="" />
        <div className="startBtnCont startBtnAnim"></div>
      </div>
    </>
  );
};

export default Settings;