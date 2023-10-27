import Footer from "../../components/provider/Footer"
import Header from "../../components/provider/Header"
import useAuthContext from "../../context/AuthContext";

const Dashboard = () => {

  const { user } = useAuthContext();

  return (
    <>
      <Header />
      <div className="container">
        <span className="h5 mb-3 fw-normal">Welcome, {user?.firstname + " " + user?.lastname}</span>
        <hr />
        <p>Dashboard content</p>
      </div>
      <Footer />
    </>
  )
}

export default Dashboard