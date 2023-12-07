import { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {

  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
  }

  return (
    <>
      <div className='border border-3 border-primary'></div>
      <div className="d-flex mt-4 ms-5">
        <Link to={'/provider'} className='navbar-brand'><img width={'75px'} height={'50px'} src="/img/logo/logo_noir_trans.png" alt="MEVENTOS" /></Link>
      </div>
      <h1 className="h3 mb-3 fw-normal">Recover your account</h1>
      <p className='text-secondary'>
        <Link to={'/provider/login'}>Signin</Link>
      </p>
      <div className="container py-3" style={{ width: "320px" }}>
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
    </>
  )
}

export default ForgotPassword