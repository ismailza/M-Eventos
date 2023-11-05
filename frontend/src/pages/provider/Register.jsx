import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthContext from '../../context/AuthContext'

const Register = () => {

  const [state, setState] = useState({
    firstname: '',
    lastname: '',
    birth_date: '',
    photo: '',
    address: '',
    phone_number: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const { register, errors } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await register({ ...state });
  }

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setState({
      ...state,
      [e.target.name]: selectedFile
    });
    if (selectedFile)
      document.getElementById('profile').src = URL.createObjectURL(selectedFile);
  }

  return (
    <>
      <div className="d-flex" style={{ flex: '1 1 auto' }}>
        <div style={{ flex: '1  1 auto' }}>
          <div className='border border-3 border-primary'></div>
          <div className="d-flex py-4 m-4">
            <Link to={'/provider'} className='navbar-brand'><h2 className='fw-bolder text-primary'>MEvents</h2></Link>
          </div>
          <div className="container py-3 md-12 w-75">
            <h1 className="h3 mb-3 fw-normal">Please register</h1>
            <p className='text-secondary'>You have already an account?
              &nbsp;
              <Link to={'/provider/login'}>Signin</Link>
            </p>
            {Object.keys(errors).length > 0 &&
              <div className="alert alert-danger">
                <ul>
                  {Object.keys(errors).map((key, index) => (
                    <li key={index}>{errors[key]}</li>
                  ))}
                </ul>
              </div>
            }
            <form className="row g-3 needs-validation text-start" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Firstname</label>
                <input type="text" name="firstname" value={state.firstname} onChange={handleChange} className="form-control" id="firstname" placeholder='Firstname' />
              </div>
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Lastname</label>
                <input type="text" name="lastname" value={state.lastname} onChange={handleChange} className="form-control" id="lastname" placeholder='Lastname' />
              </div>
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Birth Date</label>
                <input type="date" name="birth_date" value={state.birth_date} onChange={handleChange} className="form-control" id="birth_date" />
              </div>
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Phone number</label>
                <input type="text" name="phone_number" value={state.phone_number} onChange={handleChange} className="form-control" id="phone_number" placeholder='Phone number' />
              </div>
              <div className="col-md-3">
                <img className="rounded circle" id='profile' src="/public/assets/images/User-Profile.png" width={'92px'} height={'92px'} />
              </div>
              <div className="col-md-9">
                <label htmlFor="name" className="form-label">Photo</label>
                <input type="file" name="photo" onChange={handleFileChange} className="form-control" id="photo" />
              </div>
              <div className="col-md-12">
                <label htmlFor="address" className="form-label">Address</label>
                <textarea name="address" value={state.address} onChange={handleChange} className="form-control" id="address" placeholder='Address' ></textarea>
              </div>
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Username</label>
                <input type="text" name="username" value={state.username} onChange={handleChange} className="form-control" id="username" placeholder='User name' />
              </div>
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Email</label>
                <input type="text" name="email" value={state.email} onChange={handleChange} className="form-control" id="email" placeholder='Email' />
              </div>
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Password</label>
                <input type="password" name="password" value={state.password} onChange={handleChange} className="form-control" id="password" placeholder='Password' />
              </div>
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Password confirmation</label>
                <input type="password" name="password_confirmation" value={state.password_confirmation} onChange={handleChange} className="form-control" id="password_confirmation" placeholder='Password' />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
        <div style={{ flex: '1 1 auto', backgroundImage: 'url(/assets/images/auth-illustration.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      </div>
    </>
  )
}

export default Register