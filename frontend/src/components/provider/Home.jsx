import { useLocation } from "react-router-dom";
import useAuthContext from "../../context/AuthContext"

const Home = () => {

  const { user } = useAuthContext();

  const location = useLocation();

  return (
    <>
      {location.state?.message && (
        <div className="alert alert-success">
          {location.state.message}
        </div>
      )}
      <div className="py-5">
        <div className="container">
          <div className="row">
            <div className="m-auto">
              <h1 className="h3 mb-3 fw-normal">Welcome {user?.firstname}</h1>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home