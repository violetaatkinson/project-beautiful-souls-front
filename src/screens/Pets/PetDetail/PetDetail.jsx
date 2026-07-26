import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	ArrowLeft,
	Syringe,
	Zap,
	Users,
	PawPrint,
	Home,
	MapPin,
	Phone,
	Mail,
	ShieldCheck,
	Coins,
	Calendar,
} from "lucide-react";
import { getPetDetail } from "../../../services/PetService";
import { useGeolocation } from "../../../hooks/useGeolocation";
import { getPetBadges, formatPetAge } from "../../../utils/petBadges";
import "./PetDetail.css";

const COMPAT_LABEL = { yes: "Sí", no: "No", unknown: "No especificado" };

function PetDetail() {
	const [pet, setPet] = useState();
	const [photoIndex, setPhotoIndex] = useState(0);
	const { id } = useParams();
	const navigate = useNavigate();
	const { coords } = useGeolocation();

	useEffect(() => {
		getPetDetail(id, coords).then(setPet);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	if (!pet) return <p className="text-center mt-5">Cargando...</p>;

	const badges = getPetBadges(pet);
	const age = formatPetAge(pet);
	const isShelter = pet.owner?.accountType === "shelter";

	const onGalleryScroll = (event) => {
		const { scrollLeft, clientWidth } = event.target;
		setPhotoIndex(Math.round(scrollLeft / clientWidth));
	};

	return (
		<div className="pet-detail">
			<div className="pet-carousel">
				<div className="pet-carousel-track" onScroll={onGalleryScroll}>
					{(pet.images?.length ? pet.images : [null]).map((url, i) => (
						<div
							key={i}
							className="pet-carousel-slide"
							style={{ backgroundImage: url ? `url(${url})` : undefined }}
						/>
					))}
				</div>

				{pet.images?.length > 1 && (
					<div className="pet-carousel-dots">
						{pet.images.map((_, i) => (
							<span
								key={i}
								className={`dot ${i === photoIndex ? "active" : ""}`}
							/>
						))}
					</div>
				)}

				<button
					className="pet-back-btn"
					onClick={() => navigate(-1)}
					aria-label="Volver"
				>
					<ArrowLeft size={20} />
				</button>

				<div className="pet-carousel-overlay">
					<h1>
						{pet.name}
						{age && `, ${age}`}
					</h1>
					<p>
						{pet.breed || pet.species} · {pet.size}
					</p>
				</div>
			</div>

			<div className="pet-body">
				{badges.length > 0 && (
					<div className="pet-chips">
						{badges.map((b) => (
							<span key={b.key} className="chip">
								{b.label}
							</span>
						))}
					</div>
				)}

				{(pet.distanceKm != null || pet.location?.city) && (
					<p className="pet-location-line">
						<MapPin size={16} />
						{pet.distanceKm != null
							? `A ${pet.distanceKm} km de vos`
							: [pet.location?.city, pet.location?.province]
									.filter(Boolean)
									.join(", ")}
					</p>
				)}

				<p className="pet-description">{pet.description}</p>

				{pet.backstory && (
					<Section icon={<PawPrint size={18} />} title="Su historia">
						<p>{pet.backstory}</p>
					</Section>
				)}

				<Section icon={<Syringe size={18} />} title="Salud">
					<Fact label="Vacunado" value={pet.health?.vaccinated} />
					<Fact label="Castrado" value={pet.health?.sterilized} />
					<Fact label="Desparasitado" value={pet.health?.dewormed} />
					{pet.medicalNotes && <p className="fact-note">{pet.medicalNotes}</p>}
				</Section>

				<Section icon={<Home size={18} />} title="Convivencia">
					<Fact label="Entrenado en casa" value={pet.houseTrained} />
					<Fact
						label="Con niños"
						value={COMPAT_LABEL[pet.compatibility?.withKids]}
						raw
					/>
					<Fact
						label="Con perros"
						value={COMPAT_LABEL[pet.compatibility?.withDogs]}
						raw
					/>
					<Fact
						label="Con gatos"
						value={COMPAT_LABEL[pet.compatibility?.withCats]}
						raw
					/>
				</Section>

				{pet.energyLevel && (
					<Section icon={<Zap size={18} />} title="Energía">
						<p>{pet.energyLevel}</p>
					</Section>
				)}

				{pet.weight && (
					<Section icon={<Users size={18} />} title="Datos físicos">
						<Fact label="Peso" value={`${pet.weight} kg`} raw />
						{pet.color && <Fact label="Color" value={pet.color} raw />}
					</Section>
				)}

				{pet.adoptionRequirements?.length > 0 && (
					<Section
						icon={<PawPrint size={18} />}
						title="Requisitos para adoptar"
					>
						<ul>
							{pet.adoptionRequirements.map((r) => (
								<li key={r}>{r}</li>
							))}
						</ul>
					</Section>
				)}

				<Section icon={<Coins size={18} />} title="Fee de adopción">
					<p>{pet.adoptionFee > 0 ? `$${pet.adoptionFee}` : "Sin cargo"}</p>
				</Section>

				{pet.rescueDate && (
					<Section icon={<Calendar size={18} />} title="Fecha de rescate">
						<p>{new Date(pet.rescueDate).toLocaleDateString("es-AR")}</p>
					</Section>
				)}

				{pet.owner && (
					<div className="owner-card">
						<div className="owner-card-header">
							<img src={pet.owner.image} alt={pet.owner.userName} />
							<div>
								<p className="owner-name">
									{isShelter ? pet.owner.shelterName : pet.owner.userName}
									{pet.owner.shelterVerified && (
										<ShieldCheck size={16} className="verified-icon" />
									)}
								</p>
								<p className="owner-type">
									{isShelter ? "Refugio" : "Adoptante particular"}
								</p>
							</div>
						</div>
						{pet.owner.phoneNumber && (
							<a
								className="owner-contact-row"
								href={`tel:${pet.owner.phoneNumber}`}
							>
								<Phone size={16} /> {pet.owner.phoneNumber}
							</a>
						)}
						{pet.owner.email && (
							<a
								className="owner-contact-row"
								href={`mailto:${pet.owner.email}`}
							>
								<Mail size={16} /> {pet.owner.email}
							</a>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

const Fact = ({ label, value, raw }) => (
	<div className="fact-row">
		<span>{label}</span>
		<span>{raw ? value : value ? "Sí" : "No"}</span>
	</div>
);

const Section = ({ icon, title, children }) => (
	<div className="pet-section">
		<h5>
			{icon} {title}
		</h5>
		{children}
	</div>
);

export default PetDetail;
