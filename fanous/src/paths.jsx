import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Menu from './pages/menu';
import Pause from './pages/pause';

function Paths() {
    return (
    <BrowserRouter>
    <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/pause" element={<Pause />} />

    </Routes>
    </BrowserRouter>
    );
}
 
export default Paths;