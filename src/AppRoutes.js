import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import HomepageLayout from './layouts/HomepageLayout';
import Cart from './components/pages/Cart';

export default function AppRoutes() {
  return (
    <Routes>
          <Route path='/' element={<HomepageLayout />}>
            <Route index element={<Home/>} />
            <Route path="/cart" element={<Cart/>} />
          </Route>
    </Routes>
  );
}