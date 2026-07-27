import { useContext } from "react";
import { Link } from "react-router-dom";
import {
	MapPin,
	Phone,
	Mail,
	ShieldCheck,
	PawPrint,
	SquarePen,
	LogOut,
	Trash2,
	Building2,
	Home,
} from "lucide-react";
import AuthContext from "../../contexts/AuthContext";
import { deleteUser } from "../../services/UserService";
import { logout } from "../../token/AccessToken";
import { NavbarLayout } from "../../layout/NavbarLayout";
import "./Profile.css";

const Profile = () => {
	const { user } = useContext(AuthContext);

	const handleDelete = () => {
		if (!window.confirm("Delete your account? This can't be undone.")) return;
		deleteUser(user.id).then(() => logout());
	};

	const isShelter = user.accountType === "shelter";
	const location = [user.city, user.province].filter(Boolean).join(", ");

	const infoRows = [
		{ icon: <Mail size={16} />, label: "Email", value: user.email },
		{ icon: <Phone size={16} />, label: "Phone", value: user.phoneNumber },
		{ icon: <MapPin size={16} />, label: "Location", value: location },
	].filter((row) => row.value);

	return (
		<NavbarLayout align="top">
			<div className="profile-screen">
				<h1 className="profile-title">Your Profile</h1>

				<div className="profile-hero">
					<img src={user.image} alt={user.userName} className="profile-avatar" />
					<h2 className="profile-name">{user.userName || "No username set"}</h2>
					<span className={`account-type-chip ${isShelter ? "shelter" : ""}`}>
						{isShelter ? <Building2 size={14} /> : <Home size={14} />}
						<span>{isShelter ? user.shelterName || "Shelter" : "Individual adopter"}</span>
						{isShelter && user.shelterVerified && (
							<ShieldCheck size={14} className="verified-icon" />
						)}
					</span>
				</div>

				<div className="profile-body">
					{infoRows.length > 0 ? (
						<div className="info-card">
							{infoRows.map((row) => (
								<div className="info-row" key={row.label}>
									<span className="info-icon">{row.icon}</span>
									<div>
										<p className="info-label">{row.label}</p>
										<p className="info-value">{row.value}</p>
									</div>
								</div>
							))}
						</div>
					) : (
						<p className="info-empty">
							You haven't completed your profile yet. Tap "Edit Profile" to add
							your info.
						</p>
					)}

					<Link className="link-unstyled my-pets-link" to="/myadoptions">
						<PawPrint size={18} />
						<span>My Listings</span>
					</Link>

					<div className="profile-actions">
						<Link
							className="link-unstyled profile-action-primary"
							to="/edit/profile"
						>
							<SquarePen size={18} />
							Edit Profile
						</Link>
						<button
							className="profile-action-secondary"
							onClick={() => logout(user.id)}
						>
							<LogOut size={18} />
							Log Out
						</button>
						<button className="profile-action-danger" onClick={handleDelete}>
							<Trash2 size={18} />
							Delete Account
						</button>
					</div>
				</div>
			</div>
		</NavbarLayout>
	);
};

export default Profile;