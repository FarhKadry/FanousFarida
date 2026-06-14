import React from 'react';
import './home.css'
import './levels.css'
import './../animations.css'
import './../components/layout/header.css'

import depth from './../assets/depth2.svg'

import farida from './../assets/logo/farida.svg'
import starz from './../assets/logo/starz 2.svg'
import menu from './../assets/menu.svg'

import starshine from './../assets/logo/star shine.svg'
import character from './../assets/charsplash2.png'

import levelsbgimg1 from './../assets/levelsbg.jpg'
import levelsbgimg2 from './../assets/levelsbg2.jpg'
import levelsbgimg3 from './../assets/levelsbg3.jpg'
import levelsbgimg4 from './../assets/levelsbg4.jpg'

import { Link } from 'react-router-dom';
import Button from '../components/common/button';
import IconBtn from '../components/common/iconbtn';
import LevelComp from '../components/common/levelComp';
import { getUnlockedLevel, setSelectedLevel } from '../utils/progress';

const levelBackgrounds = [levelsbgimg1, levelsbgimg2, levelsbgimg3, levelsbgimg4];

const Levels = () => {
    const unlockedLevel = getUnlockedLevel();
    const bg = levelBackgrounds[unlockedLevel - 1] || levelBackgrounds[0];

    const getLevelStyles = (levelNum) => {
        const locked = levelNum > unlockedLevel;
        const isCurrent = levelNum === unlockedLevel;
        return {
            cont: `lvlBg lvl${levelNum}${locked ? ' levelCompInactive' : ''}`,
            stylepos: `levelComp floatIn${isCurrent ? ' glow' : ''}`,
            style1: `levelCont ${locked ? 'inactive' : 'current'}`,
        };
    };

    return ( <>
    <div className="fixed-mobile-wrapper">
        <header>
    <IconBtn
        icon={menu}
        style1="iconbtnmian"
        link="/menu" />
        </header>
        <img className='splashBg levelsBg' src={bg} alt="" />
        <div className="splashBg depth"></div>
    <LevelComp 
    link={unlockedLevel >= 1 ? "/onboarding" : undefined}
    {...getLevelStyles(1)}
    name=" ابن طولون"
    number="1"
    />
    <LevelComp 
    link={unlockedLevel >= 2 ? "/onboarding" : undefined}
    {...getLevelStyles(2)}
    name=" المرسي ابو العباس "
    number="2"
    />
    <LevelComp 
    link={unlockedLevel >= 3 ? "/onboarding" : undefined}
    {...getLevelStyles(3)}
    name=" القلعة"
    number="3"
    />
    <LevelComp 
    link={unlockedLevel >= 4 ? "/onboarding" : undefined}
    {...getLevelStyles(4)}
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