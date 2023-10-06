import { useEffect, useState } from "react"
import axios from "../../api/axios"
import { useNavigate } from "react-router-dom"


const AddService = () => {

  const [state, setState] = useState({
    name: '',
    description: '',
    price: '',
    medias: {},
    options: {}
  })

  const [errors, setErrors] = useState({})

  const [options, setOptions] = useState([])

  const navigate = useNavigate()

  const getOptions = async () => {
    try {
      const response = await axios.get('/api/provider/services/create')
      setOptions(response.data.options)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOptions()
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

  const csrf = () => axios.get('/sanctum/csrf-cookie');

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
        medias: {},
        options: {}
      })
      setErrors({})
      navigate('/provider/services', { state: { message: 'Service added successfully' } })
    } catch (error) {
      console.log(error)
      setErrors(error.response.data.errors)
    }

  }

  return (
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
            <form className="row g-3 needs-validation" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Service name</label>
                <input type="text" name="name" value={state.name} onChange={handleChange} className="form-control" id="name" placeholder='Service name' />
              </div>
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Price</label>
                <input type="text" name="price" value={state.price} onChange={handleChange} className="form-control" id="price" placeholder='Price' />
              </div>
              <div className="col-md-12">
                <label htmlFor="name" className="form-label">Description</label>
                <textarea name="description" value={state.description} onChange={handleChange} className="form-control" id="description" placeholder='Description' ></textarea>
              </div>
              <div className="col-md-12">
                <label htmlFor="name" className="form-label">Medias</label>
                <input type="file" name="medias" onChange={handleFileChange} className="form-control" id="medias" multiple/>
              </div>
              <div className="col-md-12">
                <label htmlFor="name" className="form-label">Options</label>
                <select name="options[]" onChange={handleChange} className="form-control" id="options" multiple>
                  {options.map((option, index) => (
                    <option key={index} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-12">
                <button className="btn btn-primary" type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddService