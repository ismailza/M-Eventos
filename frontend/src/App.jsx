import React from 'react'
import { Routes, Link, Route, useLocation } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import ProviderDashboard from './components/provider/Home'
import Login from './components/provider/Login'
import Register from './components/provider/Register'
import Profile from './components/provider/Profile'
import Services from './components/provider/Services'
import NotFound from './components/NotFound'
import useAuthContext from './context/AuthContext'
import AuthLayout from './layouts/provider/AuthLayout'
import GuestLayout from './layouts/provider/GuestLayout'
import AddService from './components/provider/AddService'
import EditService from './components/provider/EditService'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthLayout />}>
          <Route path="/provider" element={<ProviderDashboard />} />
          <Route path="/provider/profile" element={<Profile />} />
          <Route path="/provider/services" element={<Services />} />
          <Route path="/provider/services/add" element={<AddService />} />
          <Route path="/provider/services/:id/edit" element={<EditService />} />
        </Route>
        <Route element={<GuestLayout />}>
          <Route path="/provider/login" element={<Login />} />
          <Route path="/provider/register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
