import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import './../animations.css';
import './prewin.css';

import './../components/layout/header.css';

import depth from './../assets/onboardDepth.svg';
import fanous from './../assets/fanous_empty.png';
import pause from './../assets/pause.svg';

import mosque1bg from './../assets/mosque1bg.jpg';
import mosque2bg from './../assets/mosque2bg.jpg';
import mosque3bg from './../assets/mosque3bg.jpg';
import mosque4bg from './../assets/mosque4bg.jpg';
import mosque5bg from './../assets/mosque5bg.jpg';

import characterFlying from './../assets/gameplaycharpress.png';
import characterStanding from './../assets/charsplash2.png';

import adhan from './../assets/audio/adhan.mp3';

import IconBtn from '../components/common/iconbtn';
import Music from '../components/common/music';
import Progress from '../components/common/progress';
import { getMosqueIndex, getMosqueName, getSelectedLevel } from '../utils/progress';

const mosqueBackgrounds = [mosque1bg, mosque2bg, mosque3bg, mosque4bg, mosque5bg];

const InfinitePreWin = () => {
    const navigate = useNavigate();
    const level = getSelectedLevel();
    const mosqueName = getMosqueName(level);
    const splash = mosqueBackgrounds[getMosqueIndex(level)];

    const starsCollected = parseInt(
        localStorage.getItem('lastStarsCollected') ?? '0',
        10
    );

    const [scene, setScene] = useState(0);
    const [hideDepth, setHideDepth] = useState(false);
    const audioRef = useRef(null);

    const narrations = [
        `لقد اقتربنا من ${mosqueName}`,
        'استمع... لقد بدأ الأذان'
    ];

    useEffect(() => {
        const timers = [];

        timers.push(
            setTimeout(() => {
                setScene(1);

                if (audioRef.current) {
                    audioRef.current.play().catch(() => {});
                }

                timers.push(
                    setTimeout(() => {
                        setHideDepth(true);
                    }, 1000)
                );

            }, 8000)
        );

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

export default InfinitePreWin;
