import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'

const Login = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/provider/login', { username, password, remember });
      setUsername('');
      setPassword('');
      setRemember(false);
      setErrors({});
      navigate('/provider');
    } catch (err) {
      console.log(err);
      setErrors(err.response.data.errors);
    }
  }

  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="m-auto" style={{ width: "320px" }}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            {errors.message &&
              <div className="alert alert-danger">{errors.message}</div>
            }
            <form className="row g-3 needs-validation" onSubmit={handleLogin} noValidate>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} id="username" className="form-control" placeholder="Enter your username" required/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="form-control" placeholder="Enter your password" required/>
              </div>
              <div className="form-group form-check">
                <input type="checkbox" name="remember" value={remember} onChange={(e) => setRemember(e.target.value)} className="form-check-input" id="remember"/>
                <label className="form-check-label" htmlFor="remember">Remember me</label>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">Signin</button>
                <Link to="/provider/register" className="btn btn-link">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login