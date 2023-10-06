import useAuthContext from "../../context/AuthContext"

const Profile = () => {

  const { user } = useAuthContext();

  const saveProfile = (event) => {
    const inputs = document.querySelectorAll('input');
    const textareas = document.querySelectorAll('textarea');
    inputs.forEach(input => {
      input.setAttribute('disabled', 'disabled');
    });
    textareas.forEach(textarea => {
      textarea.setAttribute('disabled', 'disabled');
    });

    event.target.innerText = 'Edit Profile';
    event.target.classList.remove('btn-primary');
    event.target.classList.add('btn-warning');
    event.target.addEventListener('click', editProfile);
    event.target.setAttribute('type', 'button');
  }

  const editProfile = (event) => {
    const inputs = document.querySelectorAll('input');
    const textareas = document.querySelectorAll('textarea');
    inputs.forEach(input => {
      input.removeAttribute('disabled');
    });
    textareas.forEach(textarea => {
      textarea.removeAttribute('disabled');
    });
    
    event.target.innerText = 'Save';
    event.target.classList.remove('btn-warning');
    event.target.classList.add('btn-primary');
    event.target.removeEventListener('click', editProfile);
  }

  return (
    <div>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img className="rounded-circle mt-5 mb-3" width="150px" src={'http://localhost:8000/storage/' + user?.photo} />
              <span className="font-weight-bold">{user?.firstname} { user?.lastname }</span>
              <span className="text-black-50">{ user?.email }</span>
              <span> </span>
            </div>
          </div>
          <form className="col-md-7 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6"><label className="labels">Firstname</label><input type="text" className="form-control" placeholder="firstname" value={ user?.firstname } disabled/></div>
                <div className="col-md-6"><label className="labels">Lastname</label><input type="text" className="form-control" placeholder="lastname" value={ user?.lastname } disabled/></div>
                <div className="col-md-6"><label className="labels">Username</label><input type="text" className="form-control" value={ user?.username } placeholder="username" disabled/></div>
                <div className="col-md-6"><label className="labels">Mobile Number</label><input type="text" className="form-control" placeholder="enter phone number" value={ user?.phone_number } disabled/></div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12"><label className="labels">Address</label><textarea className="form-control" placeholder="enter address" value={ user?.address } disabled></textarea></div>
                <div className="col-md-12"><label className="labels">Email</label><input type="text" className="form-control" placeholder="enter email id" value={ user?.email } disabled/></div>
              </div>
              <div className="mt-5 text-center"><button className="btn btn-warning profile-button" onClick={editProfile} type="button">Edit Profile</button></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile