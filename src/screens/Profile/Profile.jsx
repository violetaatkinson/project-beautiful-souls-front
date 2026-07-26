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
import { PawPrint } from 'lucide-react'

const Profile = () => {
	const { user } = useContext(AuthContext);

	const handleDelete = (id) => {
        deleteUser(id)
            .then(() => {
				logout()
          })
    }

	// Solo mostramos los datos que el usuario realmente cargó
	const infoFields = [
		{ label: 'Email', value: user.email },
		{ label: 'Teléfono', value: user.phoneNumber },
		{ label: 'Nombre', value: user.firstName },
		{ label: 'Apellido', value: user.lastName },
		{ label: 'Género', value: user.gender },
		{ label: 'Edad', value: user.age },
	].filter(field => field.value)

	return (
		<div className="profile-screen">
			<Link className="link-unstyled" to={"/search"}>
				<img src={back} alt="back" width={20} className="mt-4 arrow-pr" />
			</Link>
		 	<h5 className="text-center prof-prof">Perfil</h5>
			 <div className="user" >
			 	<img
						src={user.image}
						alt={user.userName}
						className="rounded-circle border mt-2 mb-3 prof-img "
					/>
				<h5 className="text-capitalize">{user.userName || 'Sin nombre de usuario'}</h5>
			 </div>

				<div className="profile-card">
					{infoFields.length > 0 ? (
						<ul className="info-list">
							{infoFields.map(field => (
								<li key={field.label}>
									<span className="info-label">{field.label}</span>
									<span className="info-value">{field.value}</span>
								</li>
							))}
						</ul>
					) : (
						<p className="info-empty">Todavía no completaste tu información. Tocá el lápiz para agregarla.</p>
					)}

					<Link className="link-unstyled my-pets-link" to={"/myadoptions"}>
						<PawPrint size={18} />
						<span>Mis mascotas publicadas</span>
					</Link>

					<div className="other-info-buttons">
						<Link className="link-unstyled action-btn" to={"/edit/profile"}>
							<img src={edit} alt="edit" width={26}/>
							<span>Editar</span>
						</Link>
						<button className="link-unstyled action-btn" onClick={() => logout(user.id)}>
							<img src={logou} alt="logout" width={26}/>
							<span>Salir</span>
						</button>
						<button className="link-unstyled action-btn danger" onClick={() => handleDelete(user.id)}>
							<img src={trash} alt="trash" width={26}/>
							<span>Eliminar</span>
						</button>
					</div>
				</div>
		</div>
	);
};

export default Profile;