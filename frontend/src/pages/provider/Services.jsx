import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import axios from "../../api/axios"
import ReactPaginate from 'react-paginate';
import Header from "../../components/provider/Header";
import { toast } from "react-toastify";
import Footer from "../../components/provider/Footer";

const Services = () => {

  const location = useLocation()

  const [services, setServices] = useState([])
  const [errors, setErrors] = useState({})
  const [currentPage, setCurrentPage] = useState(0);
  const servicesPerPage = 10;

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
    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach(key => {
        toast.error(errors[key])
      })
    }
    
  }, [])

  const offset = currentPage * servicesPerPage;
  const currentServices = services.slice(offset, offset + servicesPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <Header />
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-12 border-right">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="card-title">Services</h4>
              <Link to={'/provider/services/add'} className="btn btn-primary btn-sm text-white mb-0 me-0" type="button">Add service</Link>
            </div>
            <div className="table-responsive  mt-1">
              <table className="table select-table" id="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Service</th>
                    <th>Category</th>
                    <th>Created at</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentServices.length === 0 &&
                    <tr>
                      <td colSpan="5" className="text-center">No services found.</td>
                    </tr>
                  }
                  {currentServices.map((service, index) => (
                    <tr key={offset + index}>
                      <td>{offset + index + 1}</td>
                      <td>{service.name}</td>
                      <td>{service.category.name}</td>
                      <td>{new Date(service.created_at).toLocaleString()}</td>
                      <td className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Link to={`/provider/services/${service.id}/edit`} className="btn btn-warning btn-sm me">Edit</Link>
                        <button className="btn btn-danger btn-sm" type="button" onClick={deleteService(service.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={Math.ceil(services.length / servicesPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination pagination-sm justify-content-end"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Services