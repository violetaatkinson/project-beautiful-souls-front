import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, PawPrint } from "lucide-react";
import { getAdopted } from "../../../services/AdoptedService";
import { NavbarLayout } from "../../../layout/NavbarLayout";
import "./ListAdopted.css";

function AdoptedList() {
	const [pets, setPets] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getAdopted()
			.then((adopted) => setPets(adopted))
			.finally(() => setLoading(false));
	}, []);

	return (
		<NavbarLayout align="top">
			<div className="stories-screen">
				<div className="stories-header">
					<h1 className="stories-title">Pet Stories</h1>
					<Link className="link-unstyled stories-add-btn" to="/adopted/create">
						<Plus size={16} />
						Share a story
					</Link>
				</div>

				{loading ? (
					<div className="stories-loading">
						<span className="loader" />
					</div>
				) : pets.length > 0 ? (
					<div className="stories-list">
						{pets.map((pet) => (
							<article key={pet._id} className="story-card">
								<img src={pet.image} alt={pet.petName} className="story-card-img" />
								<div className="story-card-body">
									<h3 className="story-card-name">{pet.petName}</h3>
									<p className="story-card-text">{pet.content}</p>
								</div>
							</article>
						))}
					</div>
				) : (
					<div className="stories-empty">
						<span className="empty-logo">
							<PawPrint size={26} strokeWidth={2.4} />
						</span>
						<h5>No stories yet</h5>
						<p>Be the first to share a pet you've loved.</p>
					</div>
				)}
			</div>
		</NavbarLayout>
	);
}

export default AdoptedList;
