import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="m-auto" style={{ width: "320px" }}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <form className="row g-3 needs-validation" noValidate>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" className="form-control" placeholder="Enter your username" required/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" className="form-control" placeholder="Enter your password" required/>
              </div>
              <div className="form-group form-check">
                <input type="checkbox" name="remember" className="form-check-input" id="remember" />
                <label className="form-check-label" htmlFor="remember">Remember me</label>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">Signin</button>
                <Link to="/register" className="btn btn-link">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login