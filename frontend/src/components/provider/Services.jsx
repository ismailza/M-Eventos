import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import axios from "../../api/axios"

const Services = () => {

  const location = useLocation()

  const [services, setServices] = useState([])
  const [errors, setErrors] = useState({})

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const getServices = async () => {
    await csrf()
    try {
      const response = await axios.get('/api/provider/services')
      setServices(response.data.services)
    } catch (error) {
      setErrors(error.response.errors)
    }
  }

  const deleteService = (id) => async (event) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return false
    event.preventDefault()
    await csrf()
    try {
      const resp = await axios.delete(`/api/provider/services/${id}`)
      const response = await axios.get('/api/provider/services')
      setServices(response.data.services)
      location.state = { message: resp.data.message }
    } catch (error) {
      setErrors(error.response.errors)
    }
  }

  useEffect(() => {
    getServices()
  }, [])

  return (
    <div className="row flex-grow">
      <div className="col-12 grid-margin stretch-card">
        <div className="card card-rounded">
          <div className="card-body">
            <div className="d-sm-flex justify-content-between align-items-start">
              <div>
                <h4 className="card-title card-title-dash title">Services</h4>
              </div>
              <div>
                <Link to={'/provider/services/add'} className="btn btn-primary btn-sm text-white mb-0 me-0" type="button">Add service</Link>
              </div>
            </div>
            {location.state && location.state.message &&
              <div className="alert alert-success">
                {location.state.message}
              </div>
            }
            {Object.keys(errors).length > 0 &&
              <div className="alert alert-danger">
                <ul>
                  {Object.keys(errors).map((key, index) => (
                    <li key={index}>{errors[key]}</li>
                  ))}
                </ul>
              </div>
            }
            <div className="table-responsive  mt-1">
              <table className="table select-table" id="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Service</th>
                    <th>Price</th>
                    <th>Created at</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.length === 0 &&
                    <tr>
                      <td colSpan="5" className="text-center">No services found.</td>
                    </tr>
                  }
                  {services.map((service, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{service.name}</td>
                      <td>{service.price}</td>
                      <td>{service.created_at}</td>
                      <td className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Link to={`/provider/services/${service.id}/edit`} className="btn btn-warning btn-sm me-md-2">Edit</Link>
                        <button className="btn btn-danger btn-sm" type="button" onClick={deleteService(service.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services