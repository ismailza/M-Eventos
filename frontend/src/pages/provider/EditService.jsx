import { useEffect, useState } from "react"
import axios from "../../api/axios"
import { Link, useNavigate, useParams } from "react-router-dom"
import Header from "../../components/provider/Header"


const AddService = () => {

  const [state, setState] = useState({
    name: '',
    description: '',
    category_id: '',
    new_category: '',
    medias: {},
    options: {}
  })

  const { id } = useParams()

  const [errors, setErrors] = useState({})

  const [options, setOptions] = useState([])

  const [categories, setCategories] = useState([])

  const navigate = useNavigate()

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const getService = async () => {
    await csrf()
    try {
      const response = await axios.get(`/api/provider/services/${id}/edit`)
      setState({
        ...state,
        name: response.data.service.name,
        description: response.data.service.description,
        category_id: response.data.service.category_id,
        medias: response.data.service.medias,
        options: response.data.service.options
      })
      setOptions(response.data.options)
      setCategories(response.data.categories)
    } catch (error) {
      setErrors({ error: error.response.data.message })
    }
  }

  useEffect(() => {
    getService()
  }, [])

  const handleChange = (event) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault()
    await csrf()
    try {
      const resp = await axios.post(`/api/provider/services/${id}/update`, state, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setState({
        name: '',
        description: '',
        price: '',
        medias: {},
        options: {}
      })
      setErrors({})
      navigate('/provider/services', { state: { message: resp.data.message } })
    } catch (error) {
      console.log(error)
      setErrors({ error: error.response.data.message })
    }

  }

  return (
    <>
      <Header />
      <div className="py-5">
        <div className="container">
          <div className="row">
            <div className="m-auto">
              <h1 className="h3 mb-3 fw-normal">Edit service</h1>
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
                  <label htmlFor="name" className="form-label">Description</label>
                  <textarea name="description" value={state.description} onChange={handleChange} className="form-control" id="description" placeholder='Description' ></textarea>
                </div>
                <div className="col-md-12">
                  <label htmlFor="name" className="form-label">Medias</label>
                  <input type="file" name="medias" onChange={handleFileChange} className="form-control" id="medias" multiple />
                </div>
                <div className="col-md-12">
                  <label htmlFor="name" className="form-label">Options</label>
                  <select name="options[]" onChange={handleChange} className="form-control" id="options" multiple>
                    {options.map((option, index) => (
                      <option
                        key={index}
                        value={option.id}
                        selected={state.options.some((selectedOption) => selectedOption.id === option.id)}
                      >
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Link to={'/provider/services'} class="btn btn-secondary me-md-2" type="button">Cancel</Link>
                  <button className="btn btn-warning" type="submit">Update</button>
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