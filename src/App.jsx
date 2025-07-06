import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Registration from './components/Registration';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Product from './components/Product';

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product" element={<Product />} />
      </Routes>

    </>
  )
}

export default App
