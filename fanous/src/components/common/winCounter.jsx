import React, { useEffect, useState, useRef } from 'react';
import './winCounter.css';

const WinCounter = (props) => {
    const [displayNumber, setDisplayNumber] = useState(0);
    const animationRef = useRef(null);

    useEffect(() => {
        const target = Number(props.number) || 0;
        const duration = 1000;

        const timeout = setTimeout(() => {
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setDisplayNumber(Math.floor(eased * target));

                if (progress < 1) {
                    animationRef.current = requestAnimationFrame(animate);
                } else {
                    setDisplayNumber(target);
                }
            };

            animationRef.current = requestAnimationFrame(animate);
        }, props.delay || 1000);

        return () => {
            clearTimeout(timeout);
            cancelAnimationFrame(animationRef.current);
        };
    }, [props.number, props.delay]);

    return (
        <>
            <div className="flex2 collectionflex1">
                <img className='collectionicon' src={props.icon} alt="" />
                <h2>{displayNumber}</h2>
            </div>
        </>
    );
}

export default WinCounter;