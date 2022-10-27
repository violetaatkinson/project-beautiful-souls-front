import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

// eslint-disable-next-line
import profile from "./Profile.css";

const Profile = () => {
	const { user } = useContext(AuthContext);

	return (
		<div>
		 	<h3 className="mt-4 text-center mt-3">Profile</h3>
			 <div className="user" >
			 	<img
						src={user.image}
						alt={user.userName}
						className="rounded-circle bg-info bg-opacity-10 border border-3 m-2 "
						width={120}
					/>
				<h5 className="text-capitalize">{user.userName}</h5>
			 </div>
				<hr></hr>
				<div className="card-body user">
					<h4 className="card-title mb-3 ">Other Information</h4>
						<div className="card-text">
							<p><strong>Email :</strong> {user.email}</p>
							<p><strong>Phone number :</strong> {user.phoneNumber}</p>
							<p><strong>First name :</strong> {user.firstName}</p>
							<p><strong>Last name :</strong> {user.lastName}</p>
							<span className="other-info">
								<p><strong>Gender :</strong> {user.gender} {user.gender ? "♂" : "♀" }</p>
								<p><strong>Age :</strong> {user.age}</p>
							</span>
						</div>
						<div className="other-info ml-4 mb-2 mt-2">
							<button type="button" class="btn btn-outline-secondary">Edit Profile</button>
							<button type="button" class="btn btn-outline-danger">Delete Profile</button>
						</div>				
				</div>	
		</div>
	);
};

export default Profile;

