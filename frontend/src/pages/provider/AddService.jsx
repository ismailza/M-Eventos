import { useEffect, useState } from "react"
import axios from "../../api/axios"
import { Link, useNavigate } from "react-router-dom"
import Header from "../../components/provider/Header"
import AddOptionModal from "../../components/provider/AddOptionModal"
import { toast } from "react-toastify"
import Footer from "../../components/provider/Footer"
import { Editor } from '@tinymce/tinymce-react';

const AddService = () => {

  const [state, setState] = useState({
    name: '',
    description: '',
    medias: {},
    options: {},
    category_id: '',
    new_category: '',
    packages: []
  })

  const [errors, setErrors] = useState({})
  const [options, setOptions] = useState([])
  const [categories, setCategories] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [stepLabels] = useState(['Step 1', 'Step 2', 'Step 3'])

  const navigate = useNavigate()

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const create = async () => {
    await csrf()
    try {
      const response = await axios.get('/api/provider/services/create')
      setOptions(response.data.options)
      setCategories(response.data.categories)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddOption = async (option) => {
    await csrf()
    try {
      const response = await axios.post('/api/provider/options/store', { name: option })
      setOptions([...options, response.data.options])
      closeModal()
      toast.success(response.data.message);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    create()

    document.querySelector('form').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        return false;
      }
    });
  }, [options])

  const checkValidity = (step) => {
    const form = document.getElementById('step' + step);
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    inputs.forEach(input => {
      if (input.checkValidity() === false) {
        isValid = false;
        input.classList.add('is-invalid');
      }
    });
    return isValid;
  }

  const handleNextStep = (e) => {
    e.preventDefault()
    if (!checkValidity(currentStep)) {
      return;
    }
    setCurrentStep(currentStep + 1);
  }

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  }

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleChange = (event) => {
    event.target.classList.remove('is-invalid')
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleCategoryChange = (event) => {
    event.target.classList.remove('is-invalid')
    if (event.target.value == 0)
    {
      document.getElementById('new_category').parentElement.classList.remove('visually-hidden')
      document.getElementById('new_category').required = true
    }
    else
    {
      document.getElementById('new_category').parentElement.classList.add('visually-hidden')
      document.getElementById('new_category').required = false
    }
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleFileChange = (event) => {
    event.target.classList.remove('is-invalid')
    setState({
      ...state,
      medias: event.target.files
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await csrf()
    try {
      await axios.post('/api/provider/services/store', state, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setState({
        name: '',
        description: '',
        price: '',
        category: '',
        medias: {},
        options: {}
      })
      setErrors({})
      toast.success('Service added successfully');
      navigate('/provider/services', { state: { message: 'Service added successfully' } })
    } catch (error) {
      console.log(error)
      setErrors(error.response.data.errors)
    }

  }

  const handleAddPackage = () => {
    const newPackages = [...state.packages];

    newPackages.push({
      name: '',
      description: '',
      price: '',
    });

    setState({
      ...state,
      packages: newPackages,
    });
  };

  const handlePackageChange = (event, index) => {
    const { name, value } = event.target;
    const newPackages = [...state.packages];

    newPackages[index] = {
      ...newPackages[index],
      [name]: value,
    };

    setState({
      ...state,
      packages: newPackages,
    });

    console.log(state)
  };

  const handleDeletePackage = (index) => {
    const newPackages = [...state.packages];
    newPackages.splice(index, 1);
    setState({
      ...state,
      packages: newPackages,
    });
  };

  return (
    <>
      <Header />
      <div className="py-5">
        <div className="container">
          <div className="row">
            <div className="m-auto">
              <h1 className="h3 mb-3 fw-normal">Add service</h1>
              {Object.keys(errors).length > 0 &&
                <div className="alert alert-danger">
                  <ul>
                    {Object.keys(errors).map((key, index) => (
                      <li key={index}>{errors[key]}</li>
                    ))}
                  </ul>
                </div>
              }
              {showModal && (
                <AddOptionModal
                  options={options}
                  onOptionAdded={handleAddOption}
                  onClose={closeModal}
                />
              )}
              <form className="row g-3 needs-validation text-start" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
                <div className="stepwizard w-100 col-md-offset-3">
                  <div className="stepwizard-row setup-panel">
                    {stepLabels.map((label, index) => (
                      <div className="stepwizard-step" key={index}>
                        <span className={`btn btn-${currentStep === index + 1 ? 'primary' : 'default'} btn-circle`}>
                          {index + 1}
                        </span>
                        <p>{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div id="step1" className={`row ${currentStep !== 1 ? 'd-none' : ''}`}>
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Service name</label>
                    <input type="text" name="name" value={state.name} onChange={handleChange} className="form-control" id="name" placeholder='Service name' required/>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select name="category_id" onChange={handleCategoryChange} className="form-control" id="category" required>
                      <option value="" selected disabled>Select category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.id}>{category.name}</option>
                      ))}
                      <option value="0">Other</option>
                    </select>
                  </div>
                  <div className="col-md-12 visually-hidden">
                    <label htmlFor="new_category">New Category</label>
                    <input type="text" name="new_category" onChange={handleChange} className="form-control" id="new_category" placeholder='New Category' />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea name="description" value={state.description} onChange={handleChange} className="form-control" id="description" placeholder='Description' required></textarea>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="medias" className="form-label">Medias</label>
                    <input type="file" name="medias" onChange={handleFileChange} className="form-control" id="medias" multiple required/>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="options" className="form-label">Options</label>
                    <button className="btn btn-primary btn-sm float-end" type="button" onClick={openModal}>Add option</button>
                    <select name="options[]" onChange={handleChange} className="form-control" id="options" multiple required>
                      {options.map((option, index) => (
                        <option key={index} value={option.id}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                  <div class="d-grid gap-2 mt-2 d-md-flex justify-content-md-center">
                    <Link to={'/provider/services'} class="btn btn-secondary me-md-2" type="button">
                      Cancel
                    </Link>
                    <button type="button" className="btn btn-primary" onClick={handleNextStep}>
                      Next
                    </button>
                  </div>
                </div>
                
                <div id="step2" className={`row ${currentStep !== 2 ? 'd-none' : ''}`}>
                  
                  {state.packages.map((packageItem, index) => (
                    <>
                      <legend className="text-center fs-6 text-primary">Package {index + 1}</legend>
                      <fieldset className="row g-3 p-2 mb-2 border">
                        <div className="col-md-6">
                          <label htmlFor="name" className="form-label">Name</label>
                          <input type="text"
                            name="name"
                            value={packageItem.name}
                            onChange={(e) => handlePackageChange(e, index)}
                            className="form-control"
                            id="name"
                            placeholder="Package name"
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="price" className="form-label">Price</label>
                          <div className="input-group mb-3">
                            <input type="number" min={0}
                              name="price"
                              value={state.price}
                              onChange={handleChange}
                              className="form-control"
                              id="price" placeholder='Price'
                              required
                            />
                            <span className="input-group-text">€</span>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <label htmlFor="description" className="form-label">Description</label>
                          <textarea
                            name="description"
                            value={''}
                            className="form-control"
                            id="description"
                            placeholder='Description'
                            required></textarea>
                        </div>
                        <div className="col-md-12">
                          <button type="button" className="btn btn-danger btn-sm float-end" onClick={() => handleDeletePackage(index)}>
                            Delete Package -
                          </button>
                        </div>
                      </fieldset>
                    </>
                  ))}
                  <div class="col-md-12">
                    <button type="button" className="btn btn-primary btn-sm" onClick={handleAddPackage}>
                      Add Package +
                    </button>
                  </div>

                  <div class="d-grid gap-2 mt-2 d-md-flex justify-content-md-center">
                    <button type="button" className="btn btn-secondary me-2" onClick={handlePreviousStep}>
                      Previous
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleNextStep}>
                      Next
                    </button>
                  </div>
                </div>

                <div id="step3" className={`row ${currentStep !== 3 ? 'd-none' : ''}`}>

                  <div class="d-grid gap-2 mt-2 d-md-flex justify-content-md-center">
                    <button type="button" className="btn btn-secondary me-2" onClick={handlePreviousStep}>
                      Previous
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default AddService