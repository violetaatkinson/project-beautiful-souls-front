import { useContext } from "react";
import { Link } from "react-router-dom";
import {
	PawPrint,
	PlusCircle,
	Camera,
	CheckCircle2,
	UserRound,
} from "lucide-react";
import AuthContext from "../../../contexts/AuthContext";
import "./Search.css";
import { NavbarLayout } from "../../../layout/NavbarLayout";

const ACTIONS = [
	{
		to: "/adoptions",
		icon: PawPrint,
		title: "Discover",
		subtitle: "Find your match",
	},
	{
		to: "/adoptions/create",
		icon: PlusCircle,
		title: "Publish",
		subtitle: "List a pet",
	},
	{
		to: "/adopted/create",
		icon: Camera,
		title: "Your story",
		subtitle: "Share it",
	},
	{
		to: "/adopted",
		icon: CheckCircle2,
		title: "Adopted",
		subtitle: "Happy endings",
	},
];

function Search() {
	const { user } = useContext(AuthContext);
	const profileIncomplete = user && (!user.firstName || !user.phoneNumber);

	return (
		<NavbarLayout>
			<div className="home-hub">
				<h2 className="hub-greeting">
					Hi{user?.userName ? `, ${user.userName}` : ""} 👋
				</h2>
				<p className="hub-subgreeting">What's next?</p>

				{profileIncomplete && (
					<Link to="/edit/profile" className="link-unstyled profile-banner">
						<UserRound size={22} />
						<div>
							<p className="profile-banner-title">Complete your profile</p>
							<p className="profile-banner-sub">So adopters can reach you</p>
						</div>
					</Link>
				)}

				<div className="hub-grid">
					{ACTIONS.map(({ to, icon: Icon, title, subtitle }) => (
						<Link key={to} to={to} className="link-unstyled hub-card">
							<span className="hub-icon">
								<Icon size={24} strokeWidth={2} />
							</span>
							<span className="hub-card-title">{title}</span>
							<span className="hub-card-subtitle">{subtitle}</span>
						</Link>
					))}
				</div>
			</div>
		</NavbarLayout>
	);
}

export default Search;
