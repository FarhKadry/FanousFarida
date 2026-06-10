import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import './../animations.css';

import star from './../assets/shootingstar2.png';
import bat from './../assets/bat1.png';
import bgImage from './../assets/environment1.jpg';
import charNormal from './../assets/gameplaychar.png';
import charPress from './../assets/gameplaycharpress.png';
import popSfx from './../assets/audio/pop.mp3';

const WIN_STARS = 8;
const GAME_DURATION = 60;
const BG_WIDTH = 5481;
const CANVAS_W = 430;
const CANVAS_H = 932;
const GRAVITY = 0.1;
const FLAP_STRENGTH = -9;
const SPEED = 3;
const BG_SPEED = 1.5;

const STAR_W = 194;
const STAR_H = 102;

export default function Gameplay1() {
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const gameState = useRef({
        bird: { x: 80, y: CANVAS_H / 2, w: 293, h: 178, vy: 0 },
        bats: [],
        stars: [],
        bgX: 0,
        frameCount: 0,
        starsCollected: 0,
        timeLeft: GAME_DURATION,
        over: false,
        started: false,
        lastTick: null,
    });
    const [display, setDisplay] = useState({ stars: 0, time: GAME_DURATION });
    const rafRef = useRef(null);
    const isPressedRef = useRef(false);
    const pressTimerRef = useRef(null);
    const popAudio = useRef(null);

    const imgs = useRef({});
    useEffect(() => {
        const load = (src) => {
            const img = new Image();
            img.src = src;
            return img;
        };
        imgs.current.star = load(star);
        imgs.current.bat = load(bat);
        imgs.current.bg = load(bgImage);
        imgs.current.charNormal = load(charNormal);
        imgs.current.charPress = load(charPress);
        popAudio.current = new Audio(popSfx);
        popAudio.current.preload = 'auto';
    }, []);

    function collides(a, b) {
        const pad = 10;
        return a.x + pad < b.x + b.w - pad &&
               a.x + a.w - pad > b.x + pad &&
               a.y + pad < b.y + b.h - pad &&
               a.y + a.h - pad > b.y + pad;
    }

    function spawnBat() {
        const h = 48 + Math.random() * 32;
        const w = 56;
        const y = 60 + Math.random() * (CANVAS_H - h - 120);
        const gs = gameState.current;
        // prevent overlap with existing stars and bats
        const tooClose = [...gs.stars, ...gs.bats].some(o =>
            Math.abs(o.x - (CANVAS_W + 20)) < 120 && Math.abs(o.y - y) < 80
        );
        if (!tooClose) gs.bats.push({ x: CANVAS_W + 20, y, w, h });
    }

    function spawnStar() {
        const y = 60 + Math.random() * (CANVAS_H - STAR_H - 120);
        const gs = gameState.current;
        // prevent overlap with existing stars and bats
        const tooClose = [...gs.stars, ...gs.bats].some(o =>
            Math.abs(o.x - (CANVAS_W + 20)) < 120 && Math.abs(o.y - y) < 80
        );
        if (!tooClose) gs.stars.push({ x: CANVAS_W + 20, y, w: STAR_W, h: STAR_H, active: true });
    }

    function handleInput() {
        const gs = gameState.current;
        if (gs.over) return;
        if (!gs.started) { gs.started = true; gs.lastTick = performance.now(); }
        gs.bird.vy = FLAP_STRENGTH;

        // Play pop sound
        if (popAudio.current) {
            popAudio.current.currentTime = 0;
            popAudio.current.play().catch(() => {});
        }

        // Switch to press image, revert after 200ms
        isPressedRef.current = true;
        clearTimeout(pressTimerRef.current);
        pressTimerRef.current = setTimeout(() => {
            isPressedRef.current = false;
        }, 200);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        function update(now) {
            const gs = gameState.current;
            if (!gs.started || gs.over) return;

            const delta = (now - gs.lastTick) / 1000;
            gs.lastTick = now;
            gs.timeLeft = Math.max(0, gs.timeLeft - delta);

            if (gs.timeLeft <= 0) {
                gs.over = true;
                navigate('/lose');
                return;
            }

            gs.frameCount++;

            gs.bird.vy += GRAVITY;
            gs.bird.y += gs.bird.vy;

            if (gs.bird.y <= 0) { gs.bird.y = 0; gs.bird.vy = 0; }
            if (gs.bird.y + gs.bird.h >= CANVAS_H - 50) {
                gs.over = true;
                navigate('/lose');
                return;
            }

            gs.bgX -= BG_SPEED;
            if (gs.bgX <= -(BG_WIDTH - CANVAS_W)) gs.bgX = 0;

            if (gs.frameCount % 95 === 0) spawnBat();
            if (gs.frameCount % 65 === 30) spawnStar();

            for (const b of gs.bats) {
                b.x -= SPEED;
                if (collides(gs.bird, b)) {
                    gs.over = true;
                    navigate('/lose');
                    return;
                }
            }
            gs.bats = gs.bats.filter(b => b.x + b.w > -10);

            for (const s of gs.stars) {
                s.x -= SPEED;
                if (s.active && collides(gs.bird, s)) {
                    s.active = false;
                    gs.starsCollected++;
                    if (gs.starsCollected >= WIN_STARS) {
                        gs.over = true;
                        navigate('/win');
                        return;
                    }
                }
            }
            gs.stars = gs.stars.filter(s => s.x + s.w > -10);

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

            ctx.fillStyle = 'rgba(0,0,0,0.25)';
            ctx.fillRect(0, CANVAS_H - 50, CANVAS_W, 50);

            for (const s of gs.stars) {
                if (!s.active) continue;
                if (imgs.current.star?.complete) {
                    ctx.drawImage(imgs.current.star, s.x, s.y, s.w, s.h);
                } else {
                    ctx.fillStyle = '#ffd700';
                    ctx.fillRect(s.x, s.y, s.w, s.h);
                }
            }

            for (const b of gs.bats) {
                if (imgs.current.bat?.complete) {
                    ctx.drawImage(imgs.current.bat, b.x, b.y, b.w, b.h);
                } else {
                    ctx.fillStyle = '#222';
                    ctx.fillRect(b.x, b.y, b.w, b.h);
                }
            }

            // Character — swap image on press, preserve aspect ratio
            const charImg = isPressedRef.current
                ? imgs.current.charPress
                : imgs.current.charNormal;
            if (charImg?.complete && charImg.naturalWidth > 0) {
                const aspect = charImg.naturalWidth / charImg.naturalHeight;
                const drawH = gs.bird.h;
                const drawW = drawH * aspect;
                ctx.drawImage(charImg, gs.bird.x, gs.bird.y, drawW, drawH);
            } else {
                ctx.fillStyle = '#111';
                ctx.fillRect(gs.bird.x, gs.bird.y, gs.bird.w, gs.bird.h);
            }

            if (!gs.started) {
                ctx.fillStyle = 'rgba(0,0,0,0.4)';
                ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 22px Courier New';
                ctx.textAlign = 'center';
                ctx.fillText('اضغط للبدأ!', CANVAS_W / 2, CANVAS_H / 2);
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
            <div style={{
                position: 'absolute', top: 16, right: 16,
                zIndex: 10, display: 'flex', alignItems: 'center', gap: 6,
                background: 'rgba(0,0,0,0.45)', borderRadius: 20,
                padding: '4px 12px', color: '#ffd700', fontFamily: 'Courier New',
                fontWeight: 'bold', fontSize: 18,
            }}>
                <img src={star} alt="star" style={{ width: 22, height: 22 }} />
                <span>{display.stars} / {WIN_STARS}</span>
            </div>

            <div style={{
                position: 'absolute', bottom: 70, left: 16,
                zIndex: 10,
                background: 'rgba(0,0,0,0.45)', borderRadius: 20,
                padding: '4px 14px', color: '#fff', fontFamily: 'Courier New',
                fontWeight: 'bold', fontSize: 18,
            }}>
                {display.time}s
            </div>

            <canvas
                ref={canvasRef}
                width={CANVAS_W}
                height={CANVAS_H}
                style={{ display: 'block', width: '100%', height: '100%', touchAction: 'none' }}
                onClick={handleInput}
                onTouchStart={e => { e.preventDefault(); handleInput(); }}
            />
        </div>
    );
}