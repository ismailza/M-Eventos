import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthContext from '../../context/AuthContext'

const ForgotPassword = () => {

  const [email, setEmail] = useState('');

  const { login } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
  }

  return (
    <>
      <div className="d-flex vh-100" style={{ flex: '1 1 auto' }}>
        <div style={{ flex: '1 1 auto' }}>
          <div className='border border-3 border-primary'></div>
          <div className="d-flex py-4 m-4">
            <Link to={'/provider'} className='navbar-brand'><h2 className='fw-bolder text-primary'>MEvents</h2></Link>
          </div>
          <div className="container py-3" style={{ width: "320px" }}>
            <h1 className="h3 mb-3 fw-normal">Recover your account</h1>
            <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="form-control" placeholder="Enter your email" required />
              </div>
              <div className="form-group d-grid">
                <button type="submit" className="btn btn-outline-primary">Continue</button>
              </div>
            </form>
          </div>
        </div>
        <div style={{ flex: '1 1 auto', backgroundImage: 'url(/assets/images/auth-illustration.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      </div>
    </>
  )
}

export default ForgotPassword