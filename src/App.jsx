import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css'
import Registration from './components/Registration';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Product from './components/Product';
import Category from './components/Category';
import Products from './components/Products';
function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category" element={<Category />} />
        <Route path="/product" element={<Product />} />
        <Route path="/products" element={<Products />} />
      </Routes>

    </>
  )
}

export default App
