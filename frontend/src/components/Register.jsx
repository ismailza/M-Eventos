import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="m-auto">
            <h1 className="h3 mb-3 fw-normal">Please register</h1>
            <form className="row g-3 needs-validation" encType="multipart/form-data" noValidate>
              <div className="col-md-4">
                <label htmlFor="name" className="form-label">Firstname</label>
                <input type="text" name="firstname" className="form-control" id="firstname" placeholder='Firstname' />
              </div>
              <div className="col-md-4">
                <label htmlFor="name" className="form-label">Lastname</label>
                <input type="text" name="lastname" className="form-control" id="lastname" placeholder='Lastname' />
              </div>
              <div className="col-md-4">
                <label htmlFor="name" className="form-label">Birth Date</label>
                <input type="date" name="birth_date" className="form-control" id="birth_date" />
              </div>
              <div className="col-md-12">
                <label htmlFor="name" className="form-label">Photo</label>
                <input type="file" name="photo" className="form-control" id="photo" />
              </div>
              <div className="col-md-12">
                <label htmlFor="address" className="form-label">Address</label>
                <textarea name="address" className="form-control" id="address" placeholder='Address' ></textarea>
              </div>
              <div className="col-md-4">
                <label htmlFor="name" className="form-label">Phone number</label>
                <input type="text" name="phone_number" className="form-control" id="phone_number" placeholder='Phone number' />
              </div>
              <div className="col-md-4">
                <label htmlFor="name" className="form-label">Username</label>
                <input type="text" name="username" className="form-control" id="username" placeholder='User name' />
              </div>
              <div className="col-md-4">
                <label htmlFor="name" className="form-label">Email</label>
                <input type="text" name="email" className="form-control" id="email" placeholder='Email' />
              </div>
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="password" placeholder='Password' />
              </div>
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Password confirmation</label>
                <input type="password" name="password_confirmation" className="form-control" id="password_confirmation" placeholder='Password' />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">Register</button>
                <Link to="/login" className="btn btn-link">Signin</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register