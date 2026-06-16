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
import PreWin2 from './pages/prewin2';
import Onboarding2 from './pages/onboarding2';
import Mission2 from './pages/mission2';
import Gameplay4 from './pages/gameplay4';
import Gameplay3 from './pages/gameplay3';
import Gameplay5 from './pages/gameplay5';


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
        <Route path="/onboarding2" element={<Onboarding2 />} />
        <Route path="/mission2" element={<Mission2 />} />

        <Route path="/win" element={<Win />} />

        <Route path="/lose" element={<Lose />} />
        <Route path="/prewin" element={<PreWin />} />
        <Route path="/prewin2" element={<PreWin2 />} />
        
        <Route path="/gameplay1" element={<Gameplay1 />} />
        <Route path="/gameplay2" element={<Gameplay2 />} />
        <Route path="/gameplay3" element={<Gameplay3 />} />
        <Route path="/gameplay5" element={<Gameplay5 />} />

        <Route path="/gameplay4" element={<Gameplay4 />} />



    </Routes>
    </BrowserRouter>
    );
}
 
export default Paths;