import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <>
      <div className="container">
        <div className="d-flex">
          <div className="py-4 m-4">
            <Link to={'/'} className='navbar-brand'><h2 className='fw-bolder text-primary'>MEvents</h2></Link>
          </div>
        </div>
        <div className="row">
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