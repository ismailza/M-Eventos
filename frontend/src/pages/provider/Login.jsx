import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthContext from '../../context/AuthContext'

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const { login } = useAuthContext();

  const handleLogin = async (event) => {
    event.preventDefault();
    await login({ username, password, remember });
  }

  return (
    <>
      <div className="d-flex vh-100" style={{ flex: '1 1 auto' }}>
        <div style={{ flex: '1 1 auto' }}>
          <div className='border border-3 border-primary'></div>
          <div className="d-flex py-4 m-4">
            <Link to={'/provider'} className='navbar-brand'><h2 className='fw-bolder text-primary'>M-Eventos</h2></Link>
          </div>
          <div className="container py-3" style={{ width: "320px" }}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <p className='text-secondary'>Don&apos;t have an account?
              &nbsp;
              <Link to={'/provider/register'}>Register</Link>
            </p>
            <form className="row g-3 needs-validation" onSubmit={handleLogin} noValidate>
              <div className="form-group text-start">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} id="username" className="form-control" placeholder="Enter your username" required />
              </div>
              <div className="form-group text-start">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="form-control" placeholder="Enter your password" required />
              </div>
              <div className="form-group form-check" style={{paddingLeft: '45px'}}>
                <input type="checkbox" name="remember" onChange={(e) => setRemember(e.target.checked)} className="form-check-input border-black" id="remember" />
                <label className="form-check-label" htmlFor="remember">Remember me</label>
              </div>
              <div className="form-group d-grid">
                <button type="submit" className="btn btn-outline-primary">Signin</button>
              </div>
              <div className="form-group text-end">
                <Link to={'/provider/forgot-password'}>Forgot password?</Link>
              </div>
            </form>
          </div>
        </div>
        <div style={{ flex: '1 1 auto', backgroundImage: 'url(/assets/images/auth-illustration.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      </div>
    </>
  )
}

export default Login