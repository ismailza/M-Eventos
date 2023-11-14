import { useEffect, useState } from "react"
import axios from "../../api/axios"
import { Link, useNavigate } from "react-router-dom"
import Header from "../../components/provider/Header"
import AddOptionModal from "../../components/provider/AddOptionModal"
import { toast } from "react-toastify"

const AddService = () => {

  const [state, setState] = useState({
    name: '',
    description: '',
    medias: {},
    options: {},
    category_id: '',
    new_category: '',
  })

  const [errors, setErrors] = useState({})

  const [options, setOptions] = useState([])

  const [categories, setCategories] = useState([])

  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

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
      toast.success(response.data.message);
      closeModal()
    } catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    create()
  }, [])

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleCategoryChange = (event) => {
    if (event.target.value == 0)
      document.getElementById('new_category').parentElement.classList.remove('visually-hidden')
    else
      document.getElementById('new_category').parentElement.classList.add('visually-hidden')
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleFileChange = (event) => {
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

                {/* https://www.codeply.com/go/PPzgkioUj2/bootstrap-step_by_step-form-example */}
                <div className="stepwizard w-100 col-md-offset-3">
                  <div className="stepwizard-row setup-panel">
                    <div className="stepwizard-step">
                      <a href="#step-1" type="button" className="btn btn-primary btn-circle">1</a>
                      <p>Step 1</p>
                    </div>
                    <div className="stepwizard-step">
                      <a href="#step-2" type="button" className="btn btn-default btn-circle" disabled="disabled">2</a>
                      <p>Step 2</p>
                    </div>
                    <div className="stepwizard-step">
                      <a href="#step-3" type="button" className="btn btn-default btn-circle" disabled="disabled">3</a>
                      <p>Step 3</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">Service name</label>
                  <input type="text" name="name" value={state.name} onChange={handleChange} className="form-control" id="name" placeholder='Service name' />
                </div>
                <div className="col-md-6">
                  <label htmlFor="category" className="form-label">Category</label>
                  <select name="category_id" onChange={handleCategoryChange} className="form-control" id="category">
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
                  <textarea name="description" value={state.description} onChange={handleChange} className="form-control" id="description" placeholder='Description' ></textarea>
                </div>
                <div className="col-md-12">
                  <label htmlFor="medias" className="form-label">Medias</label>
                  <input type="file" name="medias" onChange={handleFileChange} className="form-control" id="medias" multiple />
                </div>
                <div className="col-md-12">
                  <label htmlFor="options" className="form-label">Options</label>
                  <button className="btn btn-primary btn-sm float-end" type="button" onClick={openModal}>Add option</button>
                  <select name="options[]" onChange={handleChange} className="form-control" id="options" multiple>
                    {options.map((option, index) => (
                      <option key={index} value={option.id}>{option.name}</option>
                    ))}
                  </select>
                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Link to={'/provider/services'} class="btn btn-secondary me-md-2" type="button">Cancel</Link>
                  <button className="btn btn-primary" type="submit">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddService