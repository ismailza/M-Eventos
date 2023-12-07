
import { Link } from "react-router-dom";
import Footer from "../../components/provider/Footer"
import Header from "../../components/provider/Header"
import useAuthContext from "../../context/AuthContext";
import CountBox from "../../components/provider/CountBox";

const Dashboard = () => {

  const { dashboard, index } = useAuthContext();

  return (
    <>
      <Header />
      <div className="container">
        
        <div className="container">
          
          <div className="lower">
            <div className="content-section row">

              <CountBox title="SERVICES" color="info">
                <h5>You Have</h5>
                <h4>{dashboard['countServices']}</h4>
                <h5>Services</h5>
              </CountBox>
              <CountBox title="BOOKINGS" color="success">
                <h5>You Have</h5>
                <h4>{dashboard['countBookings']}</h4>
                <h5>Bookings</h5>
              </CountBox>
              <CountBox title="REVIEWS" color="warning">
                <h5>You Have</h5>
                <h4>{dashboard['countReviews']}</h4>
                <h5>Reviews</h5>
              </CountBox>
              <CountBox title="RATINGS" color="danger">
                <h5>You Have</h5>
                <h4>{dashboard['countRatings']}</h4>
                <h5>Ratings</h5>
              </CountBox>
              <CountBox title="SERVICES" color="primary">
                <h5>You Have</h5>
                <h4>{dashboard['countServices']}</h4>
                <h5>Services</h5>
              </CountBox>

            </div>

            <div className="space m-4"></div>

            <div className="content-section row">
              <div className="box">
                <div className="header text-center mb-3"></div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title">LATEST SERVICES BOOKING YOU HAVE</h5>
                  <Link to={'/provider/bookings'} className="btn btn-primary btn-sm text-white mb-0 me-0" type="button">View all</Link>
                </div>
                <div className="dash-card rounded p-2">
                  <table className="table table select-table">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Service</th>
                        <th scope="col">Package</th>
                        <th scope="col">Start Booking Date</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboard['latestBookings']?.map((booking, index) => (
                        <tr key={index}>
                          <td>{new Date(booking.created_at).toLocaleString()}</td>
                          <td>{booking.service.name}</td>
                          <td>{booking.package.name}</td>
                          <td>{new Date(booking.start_booking_date).toLocaleString()}</td>
                          <td className={`badge rounded-pill text-bg-${booking.status === 'pending' ? 'warning' : booking.status === 'approved' ? 'success' : 'danger'}`}>{booking.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Dashboard