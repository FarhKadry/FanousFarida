import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';
import './../animations.css';
import './prewin.css';

import './../components/layout/header.css';

import depth from './../assets/onboardDepth.svg';
import fanous from './../assets/fanous_empty.png';
import pause from './../assets/pause.svg';

import splash from './../assets/mosque3bg.jpg';

import characterFlying from './../assets/gameplaycharpress.png';
import characterStanding from './../assets/charsplash2.png';

import adhan from './../assets/audio/adhan.mp3';

import IconBtn from '../components/common/iconbtn';
import Music from '../components/common/music';
import Progress from '../components/common/progress';

const PreWin3 = () => {
    
    const navigate = useNavigate();

    const starsCollected = parseInt(
        localStorage.getItem('lastStarsCollected') ?? '0',
        10
    );

    const [scene, setScene] = useState(0);
const [hideDepth, setHideDepth] = useState(false);
    const audioRef = useRef(null);

    const narrations = [
        'لقد اقتربنا من ابي العباس',
        'استمع... لقد بدأ الأذان'
    ];

    useEffect(() => {
    const timers = [];

    // Reach the mosque
    timers.push(
        setTimeout(() => {
            setScene(1);

            if (audioRef.current) {
                audioRef.current.play().catch(() => {});
            }

            // Fade out the depth layer 1 second later
            timers.push(
                setTimeout(() => {
                    setHideDepth(true);
                }, 1000)
            );

        }, 8000)
    );

    // Navigate after adhan finishes
    timers.push(
        setTimeout(() => {
            navigate('/win');
        }, 22000)
    );

    return () => {
        timers.forEach(clearTimeout);

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };
}, [navigate]);
    return (
        <>
            <div className="fixed-mobile-wrapper">
        <Link className='skipBtn' to="/win">
        <button className='submitbtn'>
          تخطي
        </button>
        </Link>
                <header>
                    <div className="flex2">
                        <IconBtn
                            icon={pause}
                            style1="iconbtnmian"
                            link="/pause"
                        />

                        <Music />
                    </div>

                    <Progress
                        over="overHidden"

                        counter={starsCollected}
                        fanous={fanous}
                    />
                </header>

                <img
                    className="splashBg mosqueBg mosque1Anim"
                    src={splash}
                    alt=""
                />

               <img
            className={`splashBg depthOverlay ${
                hideDepth ? 'depthFadeOut' : ''
            }`}
            src={depth}
            alt=""
        />
                <div
                    key={scene}
                    className="floatIn narration prewinNarration"
                >
                    {narrations[scene]}
                </div>

                <img
                    className={`prewinChar ${
                        scene === 0
                            ? 'flyingCharacter'
                            : 'standingCharacter'
                    }`}
                    src={
                        scene === 0
                            ? characterFlying
                            : characterStanding
                    }
                    alt=""
                />

                <audio
                    ref={audioRef}
                    preload="auto"
                >
                    <source
                        src={adhan}
                        type="audio/mpeg"
                    />
                </audio>

            </div>
        </>
    );
};

export default PreWin3;