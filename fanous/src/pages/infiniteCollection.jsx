import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import './../animations.css';

import star from './../assets/shootingstar2.png';
import hilal from './../assets/hilal.png';
import diamond from './../assets/diamond.png';
import bat from './../assets/bat1.png';
import raven from './../assets/raven.png';
import wind1 from './../assets/wind1.png';
import wind2 from './../assets/wind2.png';
import wind3 from './../assets/wind3.png';
import wind4 from './../assets/wind4.png';
import bg1 from './../assets/environment1.jpg';
import bg2 from './../assets/environment2.jpg';
import bg3 from './../assets/environment3.jpg';
import bg4 from './../assets/environment4.jpg';
import charNormal from './../assets/gameplaychar.png';
import charPress from './../assets/gameplaycharpress.png';
import charFall from './../assets/gameplaycharfall.png';
import popSfx from './../assets/audio/pop.mp3';
import fallSfx from './../assets/audio/grunt.m4a';
import batSfx from './../assets/audio/bat1.mp3';
import ravenSfx from './../assets/audio/bat1.mp3';
import windSfx from './../assets/audio/flap.mp3';
import flapSfx from './../assets/audio/flap.mp3';
import collectSfx from './../assets/audio/collect.mp3';
import diamondSfx from './../assets/audio/diamond.mp3';
import fanous from './../assets/fanous_empty.png';
import pause from './../assets/pause.svg';
import Timer from '../components/common/timer';
import IconBtn from '../components/common/iconbtn';
import Music from '../components/common/music';
import Progress from '../components/common/progress';
import { getPreWinRoute, getSelectedLevel } from '../utils/progress';

const BG_WIDTH = 5481;
const CANVAS_W = 430;
const CANVAS_H = 932;
const GRAVITY = 0.08;         // was 0.1 — floatier feel
const FLAP_STRENGTH = -7.5;   // was -9 — less snappy, more controlled

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

const backgrounds = [bg1, bg2, bg3, bg4];
const obstacleTypes = ['bat', 'raven', 'wind'];
const collectibleTypes = ['star', 'hilal'];

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

function getDifficulty(level) {
    const infiniteIndex = Math.max(0, level - 6);
    return {
        winStars: Math.min(26, 12 + Math.floor(infiniteIndex)),
        duration: Math.max(32, 55 - Math.floor(infiniteIndex / 3) * 2),
        speed: Math.min(5.4, 3.6 + infiniteIndex * 0.08),
        bgSpeed: Math.min(2.6, 1.75 + infiniteIndex * 0.04),
        obstacleEvery: Math.max(80, 120 - Math.floor(infiniteIndex / 2)),   // was max 58, base 92
        collectibleEvery: Math.max(30, 48 - Math.floor(infiniteIndex / 3)), // was max 46, base 66
        diamondEvery: Math.max(210, 300 - infiniteIndex * 4),
    };
}

export default function InfiniteCollection() {
    const canvasRef = useRef(null);
    const depthRef = useRef(null);
    const navigate = useNavigate();
    const level = getSelectedLevel();
    const difficulty = useMemo(() => getDifficulty(level), [level]);

    const config = useMemo(() => ({
        obstacleType: pickRandom(obstacleTypes),
        bg: pickRandom(backgrounds),
        hasDepth: Math.random() < 0.5,
    }), []);

    const gameState = useRef({
        bird: { x: 40, y: CANVAS_H / 2, w: 200, h: 260, vy: 0, hbOffX: 40, hbOffY: 50, hbW: 120, hbH: 140 },
        obstacles: [],
        collectibles: [],
        bgX: 0,
        frameCount: 0,
        starsCollected: 0,
        timeLeft: difficulty.duration,
        over: false,
        started: true,
        lastTick: null,
    });

    const [display, setDisplay] = useState({ stars: 0, time: difficulty.duration });
    const rafRef = useRef(null);
    const isPressedRef = useRef(false);
    const isNearGroundRef = useRef(false);
    const pressTimerRef = useRef(null);
    const popAudio = useRef(null);
    const collectAudio = useRef(null);
    const diamondAudio = useRef(null);
    const fallAudio = useRef(null);
    const obstacleAudio = useRef(null);
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
        imgs.current.hilal = load(hilal);
        imgs.current.diamond = load(diamond);
        imgs.current.bat = load(bat);
        imgs.current.raven = load(raven);
        imgs.current.wind1 = load(wind1);
        imgs.current.wind2 = load(wind2);
        imgs.current.wind3 = load(wind3);
        imgs.current.wind4 = load(wind4);
        imgs.current.bg = load(config.bg);
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
        obstacleAudio.current = new Audio(
            config.obstacleType === 'raven' ? ravenSfx :
            config.obstacleType === 'wind' ? windSfx : batSfx
        );
        obstacleAudio.current.preload = 'auto';
    }, [config.bg, config.obstacleType]);

    function getBirdHitbox() {
        const b = gameState.current.bird;
        return { x: b.x + b.hbOffX, y: b.y + b.hbOffY, w: b.hbW, h: b.hbH };
    }

    function collides(a, b) {
        const pad = 14;  // was 4 — much more forgiving on obstacles
        return a.x + pad < b.x + b.w - pad &&
            a.x + a.w - pad > b.x + pad &&
            a.y + pad < b.y + b.h - pad &&
            a.y + a.h - pad > b.y + pad;
    }

    function isTooCloseToAnything(x, y, rangeX = 130, rangeY = 90) {
        const gs = gameState.current;
        return [...gs.collectibles, ...gs.obstacles].some(o =>
            Math.abs(o.x - x) < rangeX && Math.abs(o.y - y) < rangeY
        );
    }

    function spawnObstacle() {
        const y = 60 + Math.random() * (CANVAS_H - 220);
        const spawnX = CANVAS_W + 20;
        const gs = gameState.current;

        let w = 56;
        let h = 48 + Math.random() * 32;
        if (config.obstacleType === 'wind') {
            w = 100;
            h = 80 + Math.random() * 40;
        }

        if (!isTooCloseToAnything(spawnX, y, 145, 100)) {
            gs.obstacles.push({ x: spawnX, y, w, h, type: config.obstacleType });
        }
    }

    function spawnCollectible(forceDiamond = false) {
        const type = forceDiamond ? 'diamond' : pickRandom(collectibleTypes);
        const spawnX = CANVAS_W + 20;
        let w = STAR_W;
        let h = STAR_H;

        if (type === 'hilal') {
            w = HILAL_W;
            h = HILAL_H;
        }

        if (type === 'diamond') {
            w = DIAMOND_W;
            h = DIAMOND_H;
        }

        const y = 60 + Math.random() * (CANVAS_H - h - 120);
        const gs = gameState.current;

        if (!isTooCloseToAnything(spawnX, y, 145, 100)) {
            gs.collectibles.push({ x: spawnX, y, w, h, type, active: true });
        }
    }

    function trySpawnDiamond() {
        if (Math.random() > 0.18) return;
        spawnCollectible(true);
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

        function winOrContinue(gs) {
            if (gs.starsCollected >= difficulty.winStars) {
                gs.over = true;
                localStorage.setItem('lastStarsCollected', gs.starsCollected);
                navigate(getPreWinRoute(level));
                return true;
            }
            return false;
        }

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

            gs.bgX -= difficulty.bgSpeed;
            if (gs.bgX <= -(BG_WIDTH - CANVAS_W)) gs.bgX = 0;

            if (gs.frameCount % difficulty.obstacleEvery === Math.floor(difficulty.obstacleEvery / 12)) spawnObstacle();
            if (gs.frameCount % difficulty.collectibleEvery === 5) spawnCollectible();
            if (gs.frameCount % difficulty.diamondEvery === 10) trySpawnDiamond();

            for (const o of gs.obstacles) {
                o.x -= difficulty.speed;
                if (collides(getBirdHitbox(), o)) {
                    gs.over = true;
                    if (obstacleAudio.current) {
                        obstacleAudio.current.currentTime = 0;
                        obstacleAudio.current.play().catch(() => {});
                    }
                    localStorage.setItem('lastStarsCollected', gs.starsCollected);
                    navigate('/lose');
                    return;
                }
            }
            gs.obstacles = gs.obstacles.filter(o => o.x + o.w > -10);

            for (const c of gs.collectibles) {
                c.x -= difficulty.speed;
                if (c.active && collides(getBirdHitbox(), c)) {
                    c.active = false;
                    if (c.type === 'diamond') {
                        gs.starsCollected = Math.min(gs.starsCollected + 2, difficulty.winStars);
                        if (diamondAudio.current) {
                            diamondAudio.current.currentTime = 0;
                            diamondAudio.current.play().catch(() => {});
                        }
                    } else {
                        gs.starsCollected++;
                        if (collectAudio.current) {
                            collectAudio.current.currentTime = 0;
                            collectAudio.current.play().catch(() => {});
                        }
                    }
                    if (winOrContinue(gs)) return;
                }
            }
            gs.collectibles = gs.collectibles.filter(c => c.x + c.w > -10);

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

            for (const c of gs.collectibles) {
                if (!c.active) continue;
                const img = imgs.current[c.type];
                if (img?.complete) {
                    ctx.drawImage(img, c.x, c.y, c.w, c.h);
                } else {
                    ctx.fillStyle = c.type === 'diamond' ? '#a8f0ff' : '#ffd700';
                    ctx.fillRect(c.x, c.y, c.w, c.h);
                }
            }

            const windFrames = [imgs.current.wind1, imgs.current.wind2, imgs.current.wind3, imgs.current.wind4];
            const windFrame = windFrames[Math.floor(gs.frameCount / WIND_FRAME_HOLD) % windFrames.length];

            for (const o of gs.obstacles) {
                if (o.type === 'wind') {
                    if (windFrame?.complete) ctx.drawImage(windFrame, o.x, o.y, o.w, o.h);
                    else {
                        ctx.fillStyle = '#88ccff';
                        ctx.fillRect(o.x, o.y, o.w, o.h);
                    }
                } else {
                    const img = imgs.current[o.type];
                    if (img?.complete) ctx.drawImage(img, o.x, o.y, o.w, o.h);
                    else {
                        ctx.fillStyle = '#222';
                        ctx.fillRect(o.x, o.y, o.w, o.h);
                    }
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

            if (config.hasDepth && depthRef.current) {
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
    }, [config.hasDepth, difficulty, level, navigate]);

    return (
        <div className="fixed-mobile-wrapper" style={{ position: 'relative', userSelect: 'none' }}>
            <header>
                <div className="flex2">
                    <IconBtn icon={pause} style1="iconbtnmian" link="/pause" />
                    <Music />
                </div>
                <Progress counter={display.stars} counter2={difficulty.winStars} fanous={fanous} />
            </header>
            <Timer time={display.time} />
            <canvas
                ref={canvasRef}
                width={CANVAS_W}
                height={CANVAS_H}
                style={{ display: 'block', width: '100%', height: '100%', touchAction: 'none', position: 'relative', zIndex: 1 }}
                onClick={handleInput}
                onTouchStart={e => { e.preventDefault(); handleInput(); }}
            />
            {config.hasDepth && (
                <div
                    ref={depthRef}
                    style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}
                />
            )}
        </div>
    );
}