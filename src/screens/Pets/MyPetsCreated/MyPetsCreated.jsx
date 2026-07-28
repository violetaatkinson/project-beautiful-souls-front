import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, SquarePen, Trash2, PawPrint } from "lucide-react";
import { getMyPets, deletePet } from "../../../services/PetService";
import { formatPetAge } from "../../../utils/petBadges";
import { NavbarLayout } from "../../../layout/NavbarLayout";
import "./MyPetsCreated.css";

const STATUS_LABELS = {
	available: "Available",
	pending: "Pending",
	adopted: "Adopted",
};

const MyPetsCreated = () => {
	const [myPets, setMyPets] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getMyPets()
			.then((res) => setMyPets(res))
			.finally(() => setLoading(false));
	}, []);

	const handleDelete = (id) => {
		if (!window.confirm("Delete this pet listing? This can't be undone."))
			return;
		deletePet(id).then(() => {
			setMyPets((prev) => prev.filter((pet) => pet._id !== id));
		});
	};

	return (
		<NavbarLayout align="top">
			<div className="mypets-screen">
				<div className="mypets-header">
					<h1 className="mypets-title">Pet Profiles</h1>
					<Link className="link-unstyled mypets-add-btn" to="/adoptions/create">
						<Plus size={16} />
						 New Posting
					</Link>
				</div>

				{loading ? (
					<div className="mypets-loading">
						<span className="loader" />
					</div>
				) : myPets.length > 0 ? (
					<div className="mypets-list">
						{myPets.map((pet) => {
							const photo = pet.images?.[0];
							const age = formatPetAge(pet);

							return (
								<div key={pet._id} className="mypets-card">
									<Link
										className="link-unstyled mypets-photo-link"
										to={`/adoptions/${pet._id}`}
									>
										<div
											className={`mypets-photo ${!photo ? "no-photo" : ""}`}
											style={
												photo ? { backgroundImage: `url(${photo})` } : undefined
											}
										>
											{!photo && <PawPrint size={26} strokeWidth={1.8} />}
										</div>
									</Link>

									<div className="mypets-info">
										<Link
											className="link-unstyled"
											to={`/adoptions/${pet._id}`}
										>
											<h3 className="mypets-name">{pet.name}</h3>
										</Link>
										<p className="mypets-subline">
											{pet.breed || pet.species}
											{age && ` · ${age}`}
										</p>
										<span className={`status-chip status-${pet.status}`}>
											{STATUS_LABELS[pet.status] || pet.status}
										</span>
									</div>

									<div className="mypets-actions">
										<Link
											className="mypets-icon-btn"
											to={`/adoptions/edit/${pet._id}`}
											aria-label="Edit pet"
										>
											<SquarePen size={16} />
										</Link>
										<button
											type="button"
											className="mypets-icon-btn danger"
											onClick={() => handleDelete(pet._id)}
											aria-label="Delete pet"
										>
											<Trash2 size={16} />
										</button>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<div className="mypets-empty">
						<span className="empty-logo">
							<PawPrint size={26} strokeWidth={2.4} />
						</span>
						<h5>No pets published yet</h5>
						<p>Tap "New Posting" to publish your first listing</p>
					</div>
				)}
			</div>
		</NavbarLayout>
	);
};

export default MyPetsCreated;
