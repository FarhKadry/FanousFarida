import React, { useEffect } from 'react';
import './home.css'
import './levels.css'
import './loading.css'
import './../animations.css'
import './../components/layout/header.css'

import splash from './../assets/splashbg.jpg'
import { useNavigate } from 'react-router-dom';

const Loading = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/home');
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return ( <>
        <div className="fixed-mobile-wrapper">
            <img className='splashBg bg2' src={splash} alt="" />
            <div className="splashBg depth depth2"></div>
            <div className="loadingFanous"></div>
            <h2 className='flicker'> جارٍ التحميل </h2>
        </div>
    </> );
}

export default Loading;