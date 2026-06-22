import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import './../animations.css';

import star from './../assets/shootingstar2.png';
import diamond from './../assets/diamond.png';
import hilal from './../assets/hilal.png';
import wind1 from './../assets/wind1.png';
import wind2 from './../assets/wind2.png';
import wind3 from './../assets/wind3.png';
import wind4 from './../assets/wind4.png';
import bgImage from './../assets/environment2.jpg';
import charNormal from './../assets/gameplaychar.png';
import charPress from './../assets/gameplaycharpress.png';
import charFall from './../assets/gameplaycharfall.png';
import popSfx from './../assets/audio/pop.mp3';
import fallSfx from './../assets/audio/grunt.m4a';
import flapSfx from './../assets/audio/flap.mp3';
import windSfx from './../assets/audio/flap.mp3';
import fanous from './../assets/fanous_empty.png';
import pause from './../assets/pause.svg';
import collectSfx from './../assets/audio/collect.mp3';
import diamondSfx from './../assets/audio/diamond.mp3';
import Timer from '../components/common/timer';
import IconBtn from '../components/common/iconbtn';
import Music from '../components/common/music';
import Progress from '../components/common/progress';

const WIN_STARS = 10;
const GAME_DURATION = 45;
const BG_WIDTH = 5481;
const CANVAS_W = 430;
const CANVAS_H = 932;
const GRAVITY = 0.1;
const FLAP_STRENGTH = -9;
const SPEED = 4;
const BG_SPEED = 2;

const STAR_W = 130;
const STAR_H = 68;
const HILAL_W = 45;
const HILAL_H = 45;
const DIAMOND_W = 55;
const DIAMOND_H = 55;

const NEAR_GROUND_THRESHOLD = 100;
const WIND_FRAME_HOLD = 6;

const DEPTH_RADIUS = 160;
const DEPTH_INNER_STOP = '45%';
const DEPTH_COLOR = 'rgba(10, 21, 15, 0.75)';

export default function Gameplay5() {
    const canvasRef = useRef(null);
    const depthRef = useRef(null);
    const navigate = useNavigate();

    const gameState = useRef({
        bird: { x: 40, y: CANVAS_H / 2, w: 200, h: 260, vy: 0, hbOffX: 40, hbOffY: 50, hbW: 120, hbH: 140 },
        winds: [],
        stars: [],
        diamonds: [],
        hilals: [],
        bgX: 0,
        frameCount: 0,
        starsCollected: 0,
        timeLeft: GAME_DURATION,
        over: false,
        started: true,
        lastTick: null,
    });

    const [display, setDisplay] = useState({ stars: 0, time: GAME_DURATION });
    const rafRef = useRef(null);
    const isPressedRef = useRef(false);
    const isNearGroundRef = useRef(false);
    const pressTimerRef = useRef(null);
    const popAudio = useRef(null);
    const collectAudio = useRef(null);
    const diamondAudio = useRef(null);
    const fallAudio = useRef(null);
    const flapAudio = useRef(null);
    const windAudio = useRef(null);
    const fallAudioPlayingRef = useRef(false);

    const imgs = useRef({});

    useEffect(() => {
        const load = (src) => {
            const img = new Image();
            img.src = src;
            return img;
        };

        imgs.current.star = load(star);
        imgs.current.diamond = load(diamond);
        imgs.current.hilal = load(hilal);
        imgs.current.wind1 = load(wind1);
        imgs.current.wind2 = load(wind2);
        imgs.current.wind3 = load(wind3);
        imgs.current.wind4 = load(wind4);
        imgs.current.bg = load(bgImage);
        imgs.current.charNormal = load(charNormal);
        imgs.current.charPress = load(charPress);
        imgs.current.charFall = load(charFall);

        popAudio.current = new Audio(popSfx);
        popAudio.current.preload = 'auto';

        collectAudio.current = new Audio(collectSfx);
        collectAudio.current.preload = 'auto';

        diamondAudio.current = new Audio(diamondSfx);
        diamondAudio.current.preload = 'auto';

        fallAudio.current = new Audio(fallSfx);
        fallAudio.current.preload = 'auto';

        flapAudio.current = new Audio(flapSfx);
        flapAudio.current.preload = 'auto';

        windAudio.current = new Audio(windSfx);
        windAudio.current.preload = 'auto';
    }, []);

    function getBirdHitbox() {
        const b = gameState.current.bird;
        return { x: b.x + b.hbOffX, y: b.y + b.hbOffY, w: b.hbW, h: b.hbH };
    }

    function collides(a, b) {
        const pad = 4;
        return a.x + pad < b.x + b.w - pad &&
            a.x + a.w - pad > b.x + pad &&
            a.y + pad < b.y + b.h - pad &&
            a.y + a.h - pad > b.y + pad;
    }

    function spawnWind() {
        const h = 80 + Math.random() * 40;
        const w = 100;
        const y = 60 + Math.random() * (CANVAS_H - h - 120);
        const gs = gameState.current;

        const tooClose = [...gs.stars, ...gs.hilals, ...gs.diamonds, ...gs.winds].some(o =>
            Math.abs(o.x - (CANVAS_W + 20)) < 140 && Math.abs(o.y - y) < 100
        );

        if (!tooClose) gs.winds.push({ x: CANVAS_W + 20, y, w, h });
    }

    function spawnStar() {
        const y = 60 + Math.random() * (CANVAS_H - STAR_H - 120);
        const gs = gameState.current;

        const tooCloseToObstacle = gs.winds.some(o =>
            Math.abs(o.x - (CANVAS_W + 20)) < 120 && Math.abs(o.y - y) < 80
        );

        if (!tooCloseToObstacle) {
            gs.stars.push({ x: CANVAS_W + 20, y, w: STAR_W, h: STAR_H, active: true });
        }
    }

    function spawnHilal() {
        const y = 60 + Math.random() * (CANVAS_H - HILAL_H - 120);
        const gs = gameState.current;

        const tooCloseToObstacle = gs.winds.some(o =>
            Math.abs(o.x - (CANVAS_W + 20)) < 120 && Math.abs(o.y - y) < 80
        );

        if (!tooCloseToObstacle) {
            gs.hilals.push({ x: CANVAS_W + 20, y, w: HILAL_W, h: HILAL_H, active: true });
        }
    }

    function spawnDiamond() {
        if (Math.random() > 0.15) return;

        const y = 60 + Math.random() * (CANVAS_H - DIAMOND_H - 120);
        const gs = gameState.current;

        const tooCloseToObstacle = gs.winds.some(o =>
            Math.abs(o.x - (CANVAS_W + 20)) < 140 && Math.abs(o.y - y) < 90
        );

        const tooCloseToCollectible = [...gs.stars, ...gs.hilals, ...gs.diamonds].some(o =>
            Math.abs(o.x - (CANVAS_W + 20)) < 140 && Math.abs(o.y - y) < 90
        );

        if (!tooCloseToObstacle && !tooCloseToCollectible) {
            gs.diamonds.push({ x: CANVAS_W + 20, y, w: DIAMOND_W, h: DIAMOND_H, active: true });
        }
    }

    function handleInput() {
        const gs = gameState.current;
        if (gs.over) return;

        gs.bird.vy = FLAP_STRENGTH;

        if (flapAudio.current) {
            flapAudio.current.currentTime = 0;
            flapAudio.current.play().catch(() => {});
        }

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

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        gameState.current.lastTick = performance.now();

        function update(now) {
            const gs = gameState.current;
            if (!gs.started || gs.over) return;

            const delta = (now - gs.lastTick) / 1000;
            gs.lastTick = now;
            gs.timeLeft = Math.max(0, gs.timeLeft - delta);

            if (gs.timeLeft <= 0) {
                gs.over = true;
                localStorage.setItem('lastStarsCollected', gs.starsCollected);
                navigate('/lose');
                return;
            }

            gs.frameCount++;

            gs.bird.vy += GRAVITY;
            gs.bird.y += gs.bird.vy;

            if (gs.bird.y <= 0) {
                gs.bird.y = 0;
                gs.bird.vy = 0;
            }

            if (gs.bird.y >= CANVAS_H) {
                gs.over = true;
                localStorage.setItem('lastStarsCollected', gs.starsCollected);
                navigate('/lose');
                return;
            }

            const distFromGround = (CANVAS_H - 50) - (gs.bird.y + gs.bird.h);
            const nearGround = distFromGround <= NEAR_GROUND_THRESHOLD;

            if (nearGround && !isNearGroundRef.current) {
                isNearGroundRef.current = true;

                if (fallAudio.current && !fallAudioPlayingRef.current) {
                    fallAudioPlayingRef.current = true;
                    fallAudio.current.currentTime = 0;
                    fallAudio.current.play().catch(() => {});
                }
            } else if (!nearGround) {
                isNearGroundRef.current = false;
                fallAudioPlayingRef.current = false;
            }

            gs.bgX -= BG_SPEED;
            if (gs.bgX <= -(BG_WIDTH - CANVAS_W)) gs.bgX = 0;

            if (gs.frameCount % 70 === 35) spawnWind();
            if (gs.frameCount % 52 === 30) spawnStar();
            if (gs.frameCount % 82 === 62) spawnHilal();
            if (gs.frameCount % 260 === 120) spawnDiamond();

            for (const w of gs.winds) {
                w.x -= SPEED;

                if (collides(getBirdHitbox(), w)) {
                    gs.over = true;

                    if (windAudio.current) {
                        windAudio.current.currentTime = 0;
                        windAudio.current.play().catch(() => {});
                    }

                    localStorage.setItem('lastStarsCollected', gs.starsCollected);
                    navigate('/lose');
                    return;
                }
            }

            gs.winds = gs.winds.filter(w => w.x + w.w > -10);

            for (const s of gs.stars) {
                s.x -= SPEED;

                if (s.active && collides(getBirdHitbox(), s)) {
                    s.active = false;
                    gs.starsCollected++;

                    if (collectAudio.current) {
                        collectAudio.current.currentTime = 0;
                        collectAudio.current.play().catch(() => {});
                    }

                    if (gs.starsCollected >= WIN_STARS) {
                        gs.over = true;
                        localStorage.setItem('lastStarsCollected', gs.starsCollected);
                        navigate('/prewin5');
                        return;
                    }
                }
            }

            gs.stars = gs.stars.filter(s => s.x + s.w > -10);

            for (const h of gs.hilals) {
                h.x -= SPEED;

                if (h.active && collides(getBirdHitbox(), h)) {
                    h.active = false;
                    gs.starsCollected++;

                    if (collectAudio.current) {
                        collectAudio.current.currentTime = 0;
                        collectAudio.current.play().catch(() => {});
                    }

                    if (gs.starsCollected >= WIN_STARS) {
                        gs.over = true;
                        localStorage.setItem('lastStarsCollected', gs.starsCollected);
                        navigate('/prewin5');
                        return;
                    }
                }
            }

            gs.hilals = gs.hilals.filter(h => h.x + h.w > -10);

            for (const d of gs.diamonds) {
                d.x -= SPEED;

                if (d.active && collides(getBirdHitbox(), d)) {
                    d.active = false;
                    gs.starsCollected = Math.min(gs.starsCollected + 2, WIN_STARS);

                    if (diamondAudio.current) {
                        diamondAudio.current.currentTime = 0;
                        diamondAudio.current.play().catch(() => {});
                    }

                    if (gs.starsCollected >= WIN_STARS) {
                        gs.over = true;
                        localStorage.setItem('lastStarsCollected', gs.starsCollected);
                        navigate('/prewin5');
                        return;
                    }
                }
            }

            gs.diamonds = gs.diamonds.filter(d => d.x + d.w > -10);

            setDisplay({ stars: gs.starsCollected, time: Math.ceil(gs.timeLeft) });
        }

        function draw() {
            const gs = gameState.current;
            ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

            const bgImg = imgs.current.bg;
            if (bgImg) {
                ctx.drawImage(bgImg, gs.bgX, 0, BG_WIDTH, CANVAS_H);

                if (gs.bgX < 0) {
                    ctx.drawImage(bgImg, gs.bgX + BG_WIDTH, 0, BG_WIDTH, CANVAS_H);
                }
            }

            // ctx.fillStyle = 'rgba(0,0,0,0.25)';
            // ctx.fillRect(0, CANVAS_H - 50, CANVAS_W, 50);

            for (const s of gs.stars) {
                if (!s.active) continue;

                if (imgs.current.star?.complete) {
                    ctx.drawImage(imgs.current.star, s.x, s.y, s.w, s.h);
                } else {
                    ctx.fillStyle = '#ffd700';
                    ctx.fillRect(s.x, s.y, s.w, s.h);
                }
            }

            for (const h of gs.hilals) {
                if (!h.active) continue;

                if (imgs.current.hilal?.complete) {
                    ctx.drawImage(imgs.current.hilal, h.x, h.y, h.w, h.h);
                } else {
                    ctx.fillStyle = '#ffd700';
                    ctx.fillRect(h.x, h.y, h.w, h.h);
                }
            }

            for (const d of gs.diamonds) {
                if (!d.active) continue;

                if (imgs.current.diamond?.complete) {
                    ctx.drawImage(imgs.current.diamond, d.x, d.y, d.w, d.h);
                } else {
                    ctx.fillStyle = '#a8f0ff';
                    ctx.fillRect(d.x, d.y, d.w, d.h);
                }
            }

            const windFrames = [
                imgs.current.wind1,
                imgs.current.wind2,
                imgs.current.wind3,
                imgs.current.wind4,
            ];

            const windFrame = windFrames[Math.floor(gs.frameCount / WIND_FRAME_HOLD) % windFrames.length];

            for (const w of gs.winds) {
                if (windFrame?.complete) {
                    ctx.drawImage(windFrame, w.x, w.y, w.w, w.h);
                } else {
                    ctx.fillStyle = '#88ccff';
                    ctx.fillRect(w.x, w.y, w.w, w.h);
                }
            }

            const FALL_H_CORRECTION = 203 / 307;

            const charKey = isNearGroundRef.current
                ? 'charFall'
                : isPressedRef.current
                    ? 'charPress'
                    : 'charNormal';

            const charImg = imgs.current[charKey];
            const baseImg = imgs.current.charNormal;

            const baseAspect = baseImg?.naturalWidth && baseImg?.naturalHeight
                ? baseImg.naturalWidth / baseImg.naturalHeight
                : 0.811;

            const drawH = charKey === 'charFall'
                ? gs.bird.h * FALL_H_CORRECTION
                : gs.bird.h;

            const drawW = charKey === 'charFall'
                ? drawH * (249 / 203)
                : drawH * baseAspect;

            if (depthRef.current) {
                const charCenterX = gs.bird.x + drawW / 2;
                const charCenterY = gs.bird.y + drawH / 2;

                depthRef.current.style.background =
                    `radial-gradient(circle ${DEPTH_RADIUS}px at ${charCenterX}px ${charCenterY}px, transparent 0%, transparent ${DEPTH_INNER_STOP}, ${DEPTH_COLOR} 100%)`;
            }

            if (charImg?.complete) {
                ctx.drawImage(charImg, gs.bird.x, gs.bird.y, drawW, drawH);
            } else {
                ctx.fillStyle = '#111';
                ctx.fillRect(gs.bird.x, gs.bird.y, drawW, drawH);
            }
        }

        function loop(now) {
            update(now);
            draw();
            rafRef.current = requestAnimationFrame(loop);
        }

        rafRef.current = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(rafRef.current);
    }, [navigate]);

    return (
        <div className="fixed-mobile-wrapper" style={{ position: 'relative', userSelect: 'none' }}>
            <header>
                <div className="flex2">
                    <IconBtn icon={pause} style1="iconbtnmian" link="/pause" />
                    <Music />
                </div>
                <Progress counter={display.stars} counter2={WIN_STARS} fanous={fanous} />
            </header>

            <Timer time={display.time} />

            <canvas
                ref={canvasRef}
                width={CANVAS_W}
                height={CANVAS_H}
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    touchAction: 'none',
                    position: 'relative',
                    zIndex: 1,
                }}
                onClick={handleInput}
                onTouchStart={e => {
                    e.preventDefault();
                    handleInput();
                }}
            />

            <div
                ref={depthRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 2,
                }}
            />
        </div>
    );
}