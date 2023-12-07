import React from 'react'
import { Routes, Route } from 'react-router-dom'
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
import Bookings from './pages/provider/Bookings'
import { Triangle } from 'react-loader-spinner'
import { useState, useEffect } from 'react'
import Service from './pages/provider/Service'

function App() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <>
      {loading && (
        <Triangle 
          color="#000" 
          height={80}
          width={80} 
          wrapperStyle={{marginTop: '20%', marginLeft: '45%'}}
        />
      ) ||
      (
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/services" exact element={<Home />} />
          <Route path="/bons-plans" exact element={<Home />} />
          <Route path="/actualites" exact element={<Home />} />
          <Route path="/contact" exact element={<Home />} />

          <Route element={<AuthLayout />}>
            <Route path="/provider" exact element={<ProviderDashboard />} />
            <Route path="/provider/profile" exact element={<Profile />} />
            <Route path="/provider/services" exact element={<Services />} />
            <Route path="/provider/services/:id" exact element={<Service />} />
            <Route path="/provider/services/add" exact element={<AddService />} />
            <Route path="/provider/services/:id/edit" exact element={<EditService />} />
            <Route path="/provider/bookings" exact element={<Bookings />} />
          </Route>
          <Route element={<GuestLayout />}>
            <Route path="/provider/login" exact element={<Login />} />
            <Route path="/provider/register" exact element={<Register />} />
            <Route path="/provider/forgot-password" exact element={<ForgotPassword />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  )
}

export default App
