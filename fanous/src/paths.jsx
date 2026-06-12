import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Menu from './pages/menu';
import Pause from './pages/pause';
import Settings from './pages/settings';
import Levels from './pages/levels';
import HowTo from './pages/howto';
import Loading from './pages/loading';
import Onboarding from './pages/onboarding';
import Story from './pages/story';
import Win from './pages/win';
import Lose from './pages/lose';
import Gameplay1 from './pages/gameplay';
import Mission from './pages/mission';
import PreWin from './pages/prewin';
import Gameplay2 from './pages/gameplay2';


function Paths() {
    return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/pause" element={<Pause />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/levels" element={<Levels/>} />
        <Route path="/howto" element={<HowTo/>} />
        <Route path="/story" element={<Story/>} />
        <Route path="/mission" element={<Mission />} />

        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/win" element={<Win />} />
        <Route path="/prewin" element={<PreWin />} />

        <Route path="/lose" element={<Lose />} />
        <Route path="/gameplay1" element={<Gameplay1 />} />
        <Route path="/gameplay2" element={<Gameplay2 />} />



    </Routes>
    </BrowserRouter>
    );
}
 
export default Paths;