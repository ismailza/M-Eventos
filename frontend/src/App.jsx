import React from 'react'
import { Routes, Link, Route, useLocation } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import ProviderDashboard from './pages/provider/Dashboard'
import Login from './pages/provider/Login'
import Register from './pages/provider/Register'
import Profile from './pages/provider/Profile'
import Services from './pages/provider/Services'
import NotFound from './pages/NotFound'
import AuthLayout from './layouts/provider/AuthLayout'
import GuestLayout from './layouts/provider/GuestLayout'
import AddService from './pages/provider/AddService'
import EditService from './pages/provider/EditService'
import ForgotPassword from './pages/provider/ForgotPassword'

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
          <Route path="/provider/forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
