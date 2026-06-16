import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import './trivia.css';
import './../animations.css';

import star from './../assets/goldstar.svg';
import bat from './../assets/bat1.png';
import bg from './../assets/menuBg.jpg';
import char from './../assets/questionchar.png';

import charNormal from './../assets/gameplaychar.png';
import charPress from './../assets/gameplaycharpress.png';
import charFall from './../assets/gameplaycharfall.png';
import popSfx from './../assets/audio/pop.mp3';
import fallSfx from './../assets/audio/grunt.m4a';
import batSfx from './../assets/audio/bat1.mp3';
import flapSfx from './../assets/audio/flap.mp3';
import fanous from './../assets/fanous_empty.png';
import pause from './../assets/pause.svg';
import collectSfx from './../assets/audio/collect.mp3';
import Timer from '../components/common/timer';
import IconBtn from '../components/common/iconbtn';
import Music from '../components/common/music';
import Progress from '../components/common/progress';

const WIN_STARS = 4;
const GAME_DURATION = 60;
// const BG_WIDTH = 5481;
// const CANVAS_W = 430;
// const CANVAS_H = 932;
// const GRAVITY = 0.1;
// const FLAP_STRENGTH = -9;
// const SPEED = 3;
// const BG_SPEED = 1.5;

export default function Gameplay5() {
    const [display, setDisplay] = useState({ stars: 0, time: GAME_DURATION });
    const isPressedRef = useRef(false);
    const isNearGroundRef = useRef(false);
    const pressTimerRef = useRef(null);
    const popAudio = useRef(null);
    const collectAudio = useRef(null);
    const fallAudio = useRef(null);
    const batAudio = useRef(null);
    const flapAudio = useRef(null);
    const fallAudioPlayingRef = useRef(false);

    const imgs = useRef({});
    useEffect(() => {
        const load = (src) => {
            const img = new Image();
            img.src = src;
            return img;
        };
        imgs.current.star = load(star);
        imgs.current.bat = load(bat);
        // imgs.current.bg = load(bgImage);
        imgs.current.charNormal = load(charNormal);
        imgs.current.charPress = load(charPress);
        imgs.current.charFall = load(charFall);
        popAudio.current = new Audio(popSfx);
        popAudio.current.preload = 'auto';
        collectAudio.current = new Audio(collectSfx);
        collectAudio.current.preload = 'auto';
        fallAudio.current = new Audio(fallSfx);
        fallAudio.current.preload = 'auto';
        batAudio.current = new Audio(batSfx);
        batAudio.current.preload = 'auto';
        flapAudio.current = new Audio(flapSfx);
        flapAudio.current.preload = 'auto';
    }, []);

    function handleInput() {
    
        // Flap sound
        if (flapAudio.current) {
            flapAudio.current.currentTime = 0;
            flapAudio.current.play().catch(() => {});
        }

        // Pop sound
        if (popAudio.current) {
            popAudio.current.currentTime = 0;
            popAudio.current.play().catch(() => {});
        }

        isNearGroundRef.current = false;
        fallAudioPlayingRef.current = false;
        isPressedRef.current = true;
        clearTimeout(pressTimerRef.current);
        pressTimerRef.current = setTimeout(() => {
            isPressedRef.current = false;
        }, 200);
    }

    return (
        <div className="fixed-mobile-wrapper" style={{ position: 'relative', userSelect: 'none' }}>
            <header>
                <div className="flex2">
                    <IconBtn icon={pause} style1="iconbtnmian" link="/pause" />
                    <Music />
                </div>
            </header>
            <Timer time={display.time} />
            <img className='splashBg' src={bg} alt="" />
            <div className="menuPanel questionBg">
            <img className='qChar' src={char} alt="" />
<h4>
    أين وقعت أول غزوة في الاسلام؟
</h4>

<div className="answersFlex">
    <div className="answer">
        <img className='answerStar' src={star} alt="" />
        حنين
</div>
<div className="answer">
        حنين
</div>
<div className="answer">
        حنين
</div>

</div>
            </div>
        </div>
    );
}
