import React from 'react'
import { Routes, Link, Route } from 'react-router-dom'
import './App.css'

import Home from './components/provider/Home'
import About from './components/About'  
import Contact from './components/Contact'
import Login from './components/provider/Login'
import Register from './components/provider/Register'
import Profile from './components/provider/Profile'
import NotFound from './components/NotFound'

function App() {

  return (
    <>
      <header className='w-100 m-lg-0 top-0 bg-info'>
        <nav className="navbar navbar-expand-lg bg-indigo">
          <div className="container-fluid">
            <Link to={'/'} className="navbar-brand">Laraveller</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={'/provider'} className="nav-link active" aria-current="page">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/about'} className="nav-link">About</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/contact'} className="nav-link">Contact</Link>
                </li>
                {/* v-if="!authStore.user" */}
                {/* <template> */}
                  <li className="nav-item">
                    <Link to={'/provider/login'} className="nav-link" >Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/provider/register'} className="nav-link" >Register</Link>
                  </li>
                {/* </template> */}
                {/* <template v-else>
                  <li className="nav-item">
                    <button @click="authStore.handleLogout" className="btn btn-link nav-link">Logout</button>
                  </li>
                </template> */}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="container">
        <Routes>
          <Route path="/provider" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/provider/login" element={<Login />} />
          <Route path="/provider/register" element={<Register />} />
          <Route path="/provider/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App
