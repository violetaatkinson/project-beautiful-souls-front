import { useContext } from "react";
import { Link } from 'react-router-dom'
import AuthContext from "../../contexts/AuthContext";
import { deleteUser } from "../../services/UserService";
import { logout } from '../../token/AccessToken'
import "./Profile.css";
import back from '../../assets/go-back.png'
import trash from '../../assets/basura.png'
import logou from '../../assets/logout.png'
import edit from '../../assets/editar.png'

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
		 	<h5 className=" text-center prof-prof">Profile</h5>
			 <div className="user" >
			 	<img
						src={user.image}
						alt={user.userName}
						className="rounded-circle border mt-2 mb-3 prof-img " width="150" height="150"
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
						
						<div className="other-info-buttons ml-2 mb-2 mt-3 ">
							<Link className="link-unstyled" to={"/edit/profile"}>
								<img src={edit} alt="edit" width={50} onClick={() => handleDelete(user.id)}/>
								
							</Link>
								<img src={logou} alt="logou" width={50} onClick={() => logout(user.id)}/>
								
								<img src={trash} alt="trash" width={50} onClick={() => handleDelete(user.id)}/>
								
						</div>				
				</div>	
		</div>
	);
};

export default Profile;

