import { useContext } from "react";
import { Link } from 'react-router-dom'
import AuthContext from "../../contexts/AuthContext";
import { deleteUser } from "../../services/UserService";
import { logout } from '../../token/AccessToken'
import "./Profile.css";
import back from '../../assets/go-back.png'

const Profile = () => {
	const { user } = useContext(AuthContext);

	const handleDelete = (id) => {
        deleteUser(id)
            .then(() => {
				console.log('Eliminado')
          })
    }

	
	return (
		<div>
			<Link className="link-unstyled" to={"/search"}>
				<img src={back} alt="back" width={20} className="mt-4 arrow-pr" />
			</Link>
		 	<h3 className="mt-4 text-center mt-3">Profile</h3>
			 <div className="user" >
			 	<img
						src={user.image}
						alt={user.userName}
						className="rounded-circle border mt-2 mb-3 " width="150" height="150"
					/>
				<h5 className="text-capitalize">{user.userName}</h5>
			 </div>
				<hr></hr>
				<div className="card-body user">
					<h4 className="card-title mb-3 ">Other Information</h4>
						<div className="card-text prof">
							<p><strong>Email :</strong> {user.email}</p>
							<p><strong>Phone number :</strong> {user.phoneNumber}</p>
							<p><strong>First name :</strong> {user.firstName}</p>
							<p><strong>Last name :</strong> {user.lastName}</p>
							<span className="other-info">
								<p><strong>Gender :</strong> {user.gender}</p>
								<p><strong>Age :</strong> {user.age}</p>
							</span>
						</div>
						<div className="other-info ml-2 mb-2 mt-2 ">
							<Link className="link-unstyled" to={"/edit/profile"}>
								<button type="button" className="btn btn-outline-secondary">Edit</button>
							</Link>
								<button className="btn btn-outline-dark" onClick={() => logout(user.id)}>Logout</button>
								<button 
								type="button"
								className="btn btn-outline-danger"
								onClick={() => handleDelete(user.id)}
								>Delete</button>
						</div>				
				</div>	
		</div>
	);
};

export default Profile;

