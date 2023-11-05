import { useEffect, useState } from "react"
import axios from "../../api/axios"
import ReactPaginate from 'react-paginate';
import Header from "../../components/provider/Header";
import { toast } from "react-toastify";

const Bookings = () => {

  const [bookings, setBookings] = useState([])
  const [status, setStatus] = useState('pending')
  const [filteredBookings, setFilteredBookings] = useState([])
  const [errors, setErrors] = useState({})
  const [currentPage, setCurrentPage] = useState(0);
  const bookingsPerPage = 10;


  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const getBookings = async () => {
    await csrf()
    try {
      const { data } = await axios.get('/api/provider/bookings')
      setBookings(data)
      setFilteredBookings(data.filter(booking => booking.status == status))
    } catch (error) {
      setErrors(error.response.errors)
    }
  }

  useEffect(() => {
    getBookings()
    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach(key => {
        toast.error(errors[key])
      })
    }

  }, [])

  const offset = currentPage * bookingsPerPage;
  const currentBookings = filteredBookings.slice(offset, offset + bookingsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value)
    setFilteredBookings(bookings.filter((booking) => booking.status == status))
  }

  const handleStatusChange = async (e) => {

  }


  return (
    <>
      <Header />
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-12 border-right">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="card-title">Bookings</h4>
              <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" className="btn-check" name="status" value="pending" id="pending" onClick={handleStatus} autoComplete="off" checked={status === 'pending'} />
                <label className="btn btn-outline-warning btn-sm" htmlFor="pending">Pending</label>

                <input type="radio" className="btn-check" name="status" value="approved" id="approved" onClick={handleStatus} autoComplete="off" checked={status === 'approved'} />
                <label className="btn btn-outline-success btn-sm" htmlFor="approved">Approved</label>

                <input type="radio" className="btn-check" name="status" value="rejected" id="rejected" onClick={handleStatus} autoComplete="off" checked={status === 'rejected'} />
                <label className="btn btn-outline-danger btn-sm" htmlFor="rejected">Rejected</label>
              </div>
            </div>
            <div className="table-responsive  mt-1">
              <table className="table select-table" id="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Service</th>
                    <th>Client</th>
                    <th>Booking Date</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBookings.length === 0 &&
                    <tr>
                      <td colSpan="6" className="text-center">No {status} bookings found.</td>
                    </tr>
                  }
                  {currentBookings.map((booking, index) => (
                    <tr key={offset + index}>
                      <td>{offset + index + 1}</td>
                      <td>{new Date(booking.created_at).toLocaleString()}</td>
                      <td>{booking.service.name}</td>
                      <td>{booking.client.firstname} {booking.client.lastname}</td>
                      <td>{new Date(booking.start_booking_date).toLocaleString()}</td>
                      <td className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-success btn-sm me" type="button" value="approved" onClick={handleStatusChange}>Approve</button>
                        <button className="btn btn-danger btn-sm" type="button" value="rejected" onClick={handleStatusChange}>Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={Math.ceil(bookings.length / bookingsPerPage)}
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
    </>
  )
}

export default Bookings