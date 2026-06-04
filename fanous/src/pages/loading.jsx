import React, { useEffect, useState } from 'react';
import './home.css'
import './levels.css'
import './loading.css'
import './../animations.css'
import './../components/layout/header.css'

import splash from './../assets/splashbg.jpg'
import { useNavigate } from 'react-router-dom';
import { useMusic } from '../components/common/MusicContext';

const Loading = () => {
    const navigate = useNavigate();
    const { toggle } = useMusic();
    const [started, setStarted] = useState(false);

    const handleStart = () => {
        toggle();
        setStarted(true);
    };

    useEffect(() => {
        if (!started) return;
        const timer = setTimeout(() => {
            navigate('/home');
        }, null);
        return () => clearTimeout(timer);
    }, [started, navigate]);

    return (
        <div className="fixed-mobile-wrapper">
            {!started && (
                <div className="tapOverlay" onClick={handleStart}>
                اضغط للبدء
                </div>
            )}
            <img className='splashBg bg2' src={splash} alt="" />
            <div className="splashBg depth depth2"></div>
            <div className="loadingFanous"></div>
            <h2 className='flicker'>
                اضغط للبدء

                 {/* جارٍ التحميل  */}
                 </h2>
        </div>
    );
};

export default Loading;