import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Menu from './pages/menu';
import Pause from './pages/pause';
import Settings from './pages/settings';

function Paths() {
    return (
    <BrowserRouter>
    <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/pause" element={<Pause />} />
        <Route path="/settings" element={<Settings />} />


    </Routes>
    </BrowserRouter>
    );
}
 
export default Paths;