import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthContext from '../../context/AuthContext'
import Input from '../../components/provider/Input';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const { login } = useAuthContext();

  const handleInputChange = (e) => {
    e.target.classList.remove('is-invalid')
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    let valid = true;
    if (!username.trim()) {
      event.target.username.classList.add('is-invalid');
      valid = false;
    }
    if (!password.trim()) {
      event.target.password.classList.add('is-invalid');
      valid = false;
    }
    if (!valid) {
      return false;
    }
    await login({ username, password, remember });
  }

  return (
    <>
      <div className='border border-3 border-primary'></div>
      <div className="d-flex mt-4 ms-5">
        <Link to={'/provider'} className='navbar-brand'><img width={'75px'} height={'50px'} src="/img/logo/logo_noir_trans.png" alt="MEVENTOS" /></Link>
      </div>
      <h1 className="h3 mb-2 fw-normal">Please sign in</h1>
      <p className='text-secondary'>Don&apos;t have an account?
        &nbsp;
        <Link to={'/provider/register'}>Register</Link>
      </p>
      <div className="container py-3" style={{ width: "320px" }}>
        <form className="row g-3 needs-validation" onSubmit={handleLogin} noValidate>
          <Input name="username" label="Username" value={username} onChange={handleInputChange} placeholder="Enter your username" required />
          <Input name="password" label="Password" type="password" value={password} onChange={handleInputChange} placeholder="Enter your password" required />
          <div className="form-group form-check" style={{ paddingLeft: '45px' }}>
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
    </>
  )
}

export default Login