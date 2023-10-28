
import { Link } from "react-router-dom";
import Footer from "../../components/provider/Footer"
import Header from "../../components/provider/Header"
import useAuthContext from "../../context/AuthContext";

const Dashboard = () => {

  const { user } = useAuthContext();

  const date = new Date().toLocaleString();

  const storagePath = "http://localhost:8000/storage/"

  return (
    <>
      <Header />
      <div className="container">
        <div className="container-consistant flex flex-col gap-y-11">
          <div className="upper">
            <div className="upper-content d-flex justify-content-between">
              <div className="upper-left rounded-5 bg-black" style={{ maxHeight: '56px', padding: '0 10px', width:'260px' }}>
                <div className="d-flex justify-content-between align-items-center">
                  <img className="rounded-circle" src={storagePath + user?.photo} style={{ width: '40px', height: '40px' }} />
                  <div className="text-section d-grid text-white">
                    <span className="inline-block">
                      <strong>Welcome, {user?.firstname + " " + user?.lastname}</strong>
                    </span>
                    <span className="inline-block">{date}</span>
                  </div>
                </div>
              </div>
              <div className="upper-right rounded-5" style={{ width:'260px'}}>
                <div className="input-group input-group-sm mb-3">
                  <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                  <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="mb-4 mt-2" />

        <div className="container">
          
          <div className="lower">
            <div className="content-section row">

              <div className="box" style={{ width: '220px' }}>
                <div className="header text-center mb-3">MY SERVICES</div>
                <div className="dash-card bg-black text-white rounded p-2">
                  <h5>You Have</h5>
                  <h4>5/10</h4>
                </div>
              </div>

              <div className="box" style={{ width: '220px' }}>
                <div className="header text-center mb-3">MY SERVICES</div>
                <div className="dash-card bg-success text-white rounded p-2">
                  <h5>You Have</h5>
                  <h4>5/10</h4>
                </div>
              </div>

              <div className="box" style={{ width: '220px' }}>
                <div className="header text-center mb-3">MY REVIEWS</div>
                <div className="dash-card bg-warning text-white rounded p-2">
                  <h5>You Have</h5>
                  <h4>5/10</h4>
                </div>
              </div>

              <div className="box" style={{ width: '220px' }}>
                <div className="header text-center mb-3">MY SERVICES</div>
                <div className="dash-card bg-info text-white rounded p-2">
                  <h5>You Have</h5>
                  <h4>5/10</h4>
                </div>
              </div>

              <div className="box" style={{ width: '220px' }}>
                <div className="header text-center mb-3">MY SERVICES</div>
                <div className="dash-card bg-danger text-white rounded p-2">
                  <h5>You Have</h5>
                  <h4>5/10</h4>
                </div>
              </div>

            </div>

            <div className="space m-4"></div>

            <div className="content-section row">
              <div className="box">
                <div className="header text-center mb-3"></div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title">LATEST SERVICES BOOKING YOU HAVE</h5>
                  <Link to={'/provider/services'} className="btn btn-primary btn-sm text-white mb-0 me-0" type="button">View all</Link>
                </div>
                <div className="dash-card rounded p-2">
                  <table className="table table select-table">
                    <thead>
                      <tr>
                        <th scope="col">Service</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Service 1</td>
                        <td>12/12/2021</td>
                        <td className="badge rounded-pill text-bg-success">Completed</td>
                      </tr>
                      <tr>
                        <td>Service 2</td>
                        <td>12/12/2021</td>
                        <td className="badge rounded-pill text-bg-success">Completed</td>
                      </tr>
                      <tr>
                        <td>Service 3</td>
                        <td>12/12/2021</td>
                        <td className="badge rounded-pill text-bg-warning">In process</td>
                      </tr>
                      <tr>
                        <td>Service 4</td>
                        <td>12/12/2021</td>
                        <td className="badge rounded-pill text-bg-danger">Canceled</td>
                      </tr>
                      <tr>
                        <td>Service 5</td>
                        <td>12/12/2021</td>
                        <td className="badge rounded-pill text-bg-success">Completed</td>
                      </tr>
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