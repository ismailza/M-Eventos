import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <>
      <div className='border border-3 border-primary'></div>
      <div className="container">
        <div className="d-flex mt-4 ms-5">
          <Link to={'/provider'} className='navbar-brand'><img width={'75px'} height={'50px'} src="/img/logo/logo_noir_trans.png" alt="MEVENTOS" /></Link>
        </div>
        <div className="row mt-5 pt-5">
          <div className="col-md-12">
            <div className="error-template text-center">
              <h1>Oops!</h1>
              <h2>Error 404 Not Found</h2>
              <div className="error-details">
                Sorry, an error occurred. The requested page was not found!
              </div>
              <div className="error-actions mt-4">
                <Link to={'/'} className="btn btn-outline-primary">Back to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound