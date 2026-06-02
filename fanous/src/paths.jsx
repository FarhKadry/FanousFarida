import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Menu from './pages/menu';

function Paths() {
    return (
    <BrowserRouter>
    <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />

    </Routes>
    </BrowserRouter>
    );
}
 
export default Paths;