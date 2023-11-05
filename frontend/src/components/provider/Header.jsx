import { Link, useLocation } from "react-router-dom"
import useAuthContext from "../../context/AuthContext";

const Header = () => {

  const { user, logout } = useAuthContext();
  const location = useLocation();

  return (
    <header className='w-100 m-lg-0 top-0 bg-info'>
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
        <div className="container px-5">
          <Link to={'/provider'} className='navbar-brand'><span className='fw-bolder text-primary'>M-Eventos</span></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link to={'/provider'} className={`nav-link ${location.pathname === '/provider' ? 'active' : ''}`} aria-current="page">
                      Overview
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="servicesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Services
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
                      <li>
                        <Link to={'/provider/services'} className={`dropdown-item ${location.pathname === '/provider/services' ? 'active' : ''}`} aria-current="page">
                          View Services
                        </Link>
                      </li>
                      <li>
                        <Link to={'/provider/services/add'} className={`dropdown-item ${location.pathname === '/provider/services/add' ? 'active' : ''}`} aria-current="page">
                          Add Service
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link to={'/provider/bookings'} className={`nav-link ${location.pathname === '/provider/bookings' ? 'active' : ''}`} aria-current="page">
                      Booking
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={''} className={`nav-link ${location.pathname === '/provider/chat' ? 'active' : ''}`} aria-current="page">
                      Chat
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/provider/profile'} className={`nav-link ${location.pathname === '/provider/profile' ? 'active' : ''}`} aria-current="page">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button onClick={logout} className="nav-link" >Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                      <Link to={'/provider/login'} className={`nav-link ${location.pathname === '/provider/login' ? 'active' : ''}`} >
                        Login
                      </Link>
                  </li>
                  <li className="nav-item">
                      <Link to={'/provider/register'} className={`nav-link ${location.pathname === '/provider/register' ? 'active' : ''}`} >
                        Register
                      </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header