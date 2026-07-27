import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, PawPrint } from "lucide-react";
import { getLikedPets, likePet } from "../../../services/PetService";
import { NavbarLayout } from "../../../layout/NavbarLayout";
import "./MyLikes.css";

const MyLikes = () => {
	const [likedPets, setLikedPets] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getLikedPets()
			.then((res) => setLikedPets(res))
			.finally(() => setLoading(false));
	}, []);

	const handleRemoveLike = (petId) => {
		// El mismo endpoint funciona como toggle: como ya tiene like, esta
		// llamada lo saca.
		likePet(petId).then(() => {
			setLikedPets((prev) => prev.filter((pet) => pet._id !== petId));
		});
	};

	return (
		<NavbarLayout align="top">
			<div className="my-likes">
				<h1 className="likes-title">Liked Pets</h1>

				{loading && <p className="likes-loading">Loading...</p>}

				{!loading && likedPets.length === 0 && (
					<div className="likes-empty">
						<span className="empty-logo">
							<Heart size={26} strokeWidth={2.4} />
						</span>
						<h5>No liked pets yet</h5>
						<p>Swipe right on a pet you love and it'll show up here</p>
					</div>
				)}

				{!loading && likedPets.length > 0 && (
					<div className="likes-grid">
						{likedPets.map((pet) => (
							<div key={pet._id} className="like-card">
								<Link to={`/adoptions/${pet._id}`} className="link-unstyled">
									<div
										className={`like-card-img ${!pet.image ? "no-photo" : ""}`}
										style={
											pet.image
												? { backgroundImage: `url(${pet.image})` }
												: undefined
										}
									>
										{!pet.image && <PawPrint size={32} strokeWidth={1.8} />}
									</div>
									<p className="like-card-name">{pet.name}</p>
								</Link>
								<button
									type="button"
									className="like-remove-btn"
									onClick={() => handleRemoveLike(pet._id)}
									aria-label="Remove from favorites"
								>
									<Heart size={16} fill="currentColor" strokeWidth={0} />
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</NavbarLayout>
	);
};

export default MyLikes;
