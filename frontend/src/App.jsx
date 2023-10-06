import React from 'react'
import { Routes, Link, Route, useLocation } from 'react-router-dom'
import './App.css'

import Home from './components/provider/Home'
import Login from './components/provider/Login'
import Register from './components/provider/Register'
import Profile from './components/provider/Profile'
import Services from './components/provider/Services'
import NotFound from './components/NotFound'
import useAuthContext from './context/AuthContext'
import AuthLayout from './layouts/AuthLayout'
import GuestLayout from './layouts/GuestLayout'
import AddService from './components/provider/AddService'
import EditService from './components/provider/EditService'

function App() {

  const { user, logout } = useAuthContext();
  
  const location = useLocation();

  return (
    <>
      <header className='w-100 m-lg-0 top-0 bg-info'>
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
          <div className="container px-5">
            <Link to={'/provider'} className='navbar-brand'><span className='fw-bolder text-primary'>MEvents</span></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
                {user ? (
                  <>
                    <li className="nav-item">
                      <Link to={'/provider'} className={`nav-link ${location.pathname === '/provider' ? 'active' : ''}`} aria-current="page">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={'/provider/services'} className={`nav-link ${location.pathname === '/provider/services' ? 'active' : ''}`} aria-current="page">Services</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={'/provider/profile'} className={`nav-link ${location.pathname === '/provider/profile' ? 'active' : ''}`} aria-current="page">Profile</Link>
                    </li>
                    <li className="nav-item">
                      <button onClick={logout} className="nav-link" >Logout</button>
                    </li>
                  </>
                  ) : (
                  <>
                    <li className="nav-item">
                      <Link to={'/provider/login'} className={`nav-link ${location.pathname === '/provider/login' ? 'active' : ''}`} >Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={'/provider/register'} className={`nav-link ${location.pathname === '/provider/register' ? 'active' : ''}`} >Register</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="container">
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/provider" element={<Home />} />
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
      </div>
    </>
  )
}

export default App
