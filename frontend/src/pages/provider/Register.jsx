import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthContext from '../../context/AuthContext'
import Input from '../../components/provider/Input'

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

  const [currentStep, setCurrentStep] = useState(1)
  const { register, errors } = useAuthContext();

  const checkValidity = (step) => {
    const form = document.getElementById('step' + step);
    const inputs = form.querySelectorAll('Input');
    let valid = true;
    for (const input of inputs) {
      const inputValue = input.value;
      if (!inputValue.trim()) {
        input.classList.add('is-invalid');
        valid = false;
      }
    }
    return valid;
  };  

  const handleNext = (e) => {
    if (!checkValidity(1))
      return;
    setCurrentStep(2);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!checkValidity(2)) {
      return;
    }
    await register({ ...state });
  }

  const handleChange = (e) => {
    e.target.classList.remove('is-invalid')
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const handleFileChange = (e) => {
    e.target.classList.remove('is-invalid')
    const selectedFile = e.target.files[0];
    setState({
      ...state,
      [e.target.name]: selectedFile
    });
    if (selectedFile)
      document.getElementById('profile').src = URL.createObjectURL(selectedFile);
  }

  const handlePhoneChange = (e) => {
    const phone_number = document.getElementById('phone_number');
    const phone_number_value = phone_number.value;
    if (!phone_number_value.match(/^(\+)?[0-9]{10,14}$/))
      phone_number.classList.add('is-invalid')
    else
      phone_number.classList.remove('is-invalid')
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const confirmPassword = (e) => {
    const password = document.getElementById('password');
    const password_confirmation = document.getElementById('password_confirmation');
    if (password.value !== password_confirmation.value)
      password_confirmation.classList.add('is-invalid')
    else
      password_confirmation.classList.remove('is-invalid')
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <div className='border border-3 border-primary'></div>
      <div className="d-flex mt-4 ms-5">
        <Link to={'/provider'} className='navbar-brand'><img width={'75px'} height={'50px'} src="/img/logo/logo_noir_trans.png" alt="MEVENTOS" /></Link>
      </div>
      <h1 className="h3 mb-2 fw-normal">Please register</h1>
      <p className='text-secondary'>You have already an account?
        &nbsp;
        <Link to={'/provider/login'}>Signin</Link>
      </p>
      <div className="container" style={{ width: "320px" }}>
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
          <div id="step1" className={currentStep === 1 ? '' : 'd-none'}>
            <div className="col-md-12 d-flex justify-content-center mb-2">
              <img className="rounded circle" id='profile' src="/public/assets/images/User-Profile.png" width={'92px'} height={'92px'} />
            </div>
            <Input label="Firsname" name="firstname" value={state.firstname} onChange={handleChange} id="firstname" placeholder='Firstname' required />
            <Input label="Lastname" name="lastname" value={state.lastname} onChange={handleChange} id="lastname" placeholder='Lastname' required />
            <Input label="Birth date" type="date" name="birth_date" value={state.birth_date} onChange={handleChange} id="birth_date" placeholder='Birth date' required />
            <Input label="Photo" type="file" name="photo" onChange={handleFileChange} id="photo" placeholder='Photo' required />
            <div className="form-group">
              <button type="button" className="btn btn-primary w-100" onClick={handleNext}>Next</button>
            </div>
          </div>

          <div id="step2" className={currentStep === 2 ? '' : "d-none"}>
            <Input type='textarea' label="Address" name="address" value={state.address} onChange={handleChange} id="address" placeholder='Address' required />
            <Input label="Phone number" name="phone_number" value={state.phone_number} onChange={handlePhoneChange} id="phone_number" placeholder='Phone number' required />
            <Input label="Username" name="username" value={state.username} onChange={handleChange} id="username" placeholder='User name' required />
            <Input type='email' label="Email" name="email" value={state.email} onChange={handleChange} id="email" placeholder='Email' required />
            <Input label="Password" type="password" name="password" value={state.password} onChange={handleChange} id="password" placeholder='Password' required />
            <Input label="Password confirmation" type="password" name="password_confirmation" value={state.password_confirmation} onChange={confirmPassword} id="password_confirmation" placeholder='Password' required />
            <div class="d-grid gap-2">
              <button type="submit" className="btn btn-primary">Register</button>
              <button type="button" className="btn btn-outline-primary" onClick={() => setCurrentStep(1)}>Previous</button>
            </div>
          </div>

        </form>
      </div>
    </>
  )
}

export default Register