import React, { useMemo, useState } from 'react';
import './home.css';
import './levels.css';
import './../animations.css';
import './../components/layout/header.css';

import menu from './../assets/menu.svg';

import levelsbgimg1 from './../assets/levelsbg.jpg';
import levelsbgimg2 from './../assets/levelsbg2.jpg';
import levelsbgimg3 from './../assets/levelsbg3.jpg';
import levelsbgimg4 from './../assets/levelsbg4.jpg';
import levelsbgimg5 from './../assets/levelsbg5.jpg';

import IconBtn from '../components/common/iconbtn';
import LevelComp from '../components/common/levelComp';
import {
    getUnlockedLevel,
    MOSQUE_NAMES,
    getMosqueIndex,
} from '../utils/progress';

const levelBackgrounds = [
    levelsbgimg1,
    levelsbgimg2,
    levelsbgimg3,
    levelsbgimg4,
    levelsbgimg5,
];

const LEVELS_PER_PAGE = 5;

const Levels = () => {
    const unlockedLevel = getUnlockedLevel();

    const initialPage = Math.max(
        0,
        Math.floor((unlockedLevel - 1) / LEVELS_PER_PAGE)
    );

    const [page, setPage] = useState(initialPage);

    const pageStart = page * LEVELS_PER_PAGE + 1;

    const visibleLevels = useMemo(
        () => Array.from({ length: LEVELS_PER_PAGE }, (_, i) => pageStart + i),
        [pageStart]
    );

    const currentLevelOnPage = Math.min(
        Math.max(unlockedLevel, pageStart),
        pageStart + LEVELS_PER_PAGE - 1
    );

    const bg =
        levelBackgrounds[getMosqueIndex(currentLevelOnPage)] ||
        levelBackgrounds[0];

    const getLevelStyles = (levelNum, visualNum) => {
        const locked = levelNum > unlockedLevel;
        const isCurrent = levelNum === unlockedLevel;

        return {
            cont: `lvlBg lvl${visualNum}${locked ? ' levelCompInactive' : ''}`,
            stylepos: `levelComp floatIn${isCurrent ? ' glow' : ''}`,
            style1: `levelCont ${locked ? 'inactive' : 'current'}`,
        };
    };

    return (
        <>
            <div className="fixed-mobile-wrapper">
                <header style={{ width: 'fit-content', alignSelf: 'flex-start' }}>
                    <IconBtn
                        icon={menu}
                        style1="iconbtnmian"
                        link="/menu"
                    />
                </header>

                <img className="splashBg levelsBg" src={bg} alt="" />
                <div className="splashBg depth"></div>

                {visibleLevels.map((levelNum, index) => {
                    const visualNum = index + 1;
                    const unlocked = unlockedLevel >= levelNum;

                    return (
                        <LevelComp
                            key={levelNum}
                            link={unlocked ? "/onboarding" : undefined}
                            {...getLevelStyles(levelNum, visualNum)}
                            name={` ${MOSQUE_NAMES[getMosqueIndex(levelNum)]} `}
                            number={String(levelNum)}
                        />
                    );
                })}

                <button
                    className="skipBtn"
                    style={{
                        position: 'absolute',
                        right: 24,
                        bottom: 34,
                        zIndex: 20,
                        minWidth: 105,
                    }}
                    onClick={() => setPage(prev => prev + 1)}
                >
                    التالي
                </button>

                {page > 0 && (
                    <button
                        className="skipBtn"
                        style={{
                            position: 'absolute',
                            left: 24,
                            bottom: 34,
                            zIndex: 20,
                            minWidth: 105,
                        }}
                        onClick={() => setPage(prev => Math.max(0, prev - 1))}
                    >
                        السابق
                    </button>
                )}
            </div>
        </>
    );
};

export default Levels;