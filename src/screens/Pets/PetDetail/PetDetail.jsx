import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft, Syringe, Zap, Users, PawPrint, Home,
  MapPin, Phone, Mail, ShieldCheck, Coins, Calendar, Heart, X, MessageCircle,
} from "lucide-react";
import { getPetDetail, likePet, dislikePet } from "../../../services/PetService";
import { useGeolocation } from "../../../hooks/useGeolocation";
import { getPetBadges, formatPetAge } from "../../../utils/petBadges";
import AuthContext from "../../../contexts/AuthContext";
import "./PetDetail.css";

const COMPAT_LABEL = { yes: "Yes", no: "No", unknown: "Not specified" };

function PetDetail() {
  const [pet, setPet] = useState();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [brokenImages, setBrokenImages] = useState(new Set());
  const { id } = useParams();
  const navigate = useNavigate();
  const { coords } = useGeolocation();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getPetDetail(id, coords).then(setPet);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!pet) return <p className="text-center mt-5">Loading...</p>;

  const badges = getPetBadges(pet);
  const age = formatPetAge(pet);
  const isShelter = pet.owner?.accountType === "shelter";
  const hasPhotos = pet.images?.length > 0;

  const markBroken = (i) => setBrokenImages((prev) => new Set(prev).add(i));

  const onGalleryScroll = (event) => {
    const { scrollLeft, clientWidth } = event.target;
    setPhotoIndex(Math.round(scrollLeft / clientWidth));
  };

  const handleLike = () => likePet(pet._id).then(() => navigate("/adoptions"));
  const handleDislike = () => dislikePet(pet._id).then(() => navigate("/adoptions"));

  return (
    <div className="pet-detail">
      <div className="pet-carousel">
        <div className="pet-carousel-track" onScroll={onGalleryScroll}>
          {(hasPhotos ? pet.images : [null]).map((url, i) => {
            const showFallback = !url || brokenImages.has(i);
            return (
              <div key={i} className="pet-carousel-slide">
                {!showFallback && (
                  <img
                    src={url}
                    alt={`${pet.name} ${i + 1}`}
                    className="pet-carousel-img"
                    onError={() => markBroken(i)}
                  />
                )}
                {showFallback && (
                  <div className="pet-carousel-fallback">
                    <PawPrint size={64} className="carousel-fallback-icon" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {pet.images?.length > 1 && (
          <div className="pet-carousel-dots">
            {pet.images.map((_, i) => (
              <span key={i} className={`dot ${i === photoIndex ? "active" : ""}`} />
            ))}
          </div>
        )}

        <button className="pet-back-btn" onClick={() => navigate(-1)} aria-label="Back">
          <ArrowLeft size={20} />
        </button>

        <div className="pet-carousel-overlay">
          <h1>{pet.name}{age && `, ${age}`}</h1>
          <p>{pet.breed || pet.species} · {pet.size}</p>
        </div>
      </div>

      <div className="pet-body">
        {badges.length > 0 && (
          <div className="pet-chips">
            {badges.map((b) => <span key={b.key} className="chip">{b.label}</span>)}
          </div>
        )}

        {(pet.distanceKm != null || pet.location?.city) && (
          <p className="pet-location-line">
            <MapPin size={16} />
            {pet.distanceKm != null ? `${pet.distanceKm} km away` : [pet.location?.city, pet.location?.province].filter(Boolean).join(", ")}
          </p>
        )}

        <p className="pet-description">{pet.description}</p>

        {pet.backstory && (
          <Section icon={<PawPrint size={18} />} title="Their story">
            <p>{pet.backstory}</p>
          </Section>
        )}

        <Section icon={<Syringe size={18} />} title="Health">
          <Fact label="Vaccinated" value={pet.health?.vaccinated} />
          <Fact label="Spayed/Neutered" value={pet.health?.sterilized} />
          <Fact label="Dewormed" value={pet.health?.dewormed} />
          {pet.medicalNotes && <p className="fact-note">{pet.medicalNotes}</p>}
        </Section>

        <Section icon={<Home size={18} />} title="Living with others">
          <Fact label="House trained" value={pet.houseTrained} />
          <Fact label="With kids" value={COMPAT_LABEL[pet.compatibility?.withKids]} raw />
          <Fact label="With dogs" value={COMPAT_LABEL[pet.compatibility?.withDogs]} raw />
          <Fact label="With cats" value={COMPAT_LABEL[pet.compatibility?.withCats]} raw />
        </Section>

        {pet.energyLevel && (
          <Section icon={<Zap size={18} />} title="Energy level">
            <p>{pet.energyLevel}</p>
          </Section>
        )}

        {pet.weight && (
          <Section icon={<Users size={18} />} title="Physical details">
            <Fact label="Weight" value={`${pet.weight} kg`} raw />
            {pet.color && <Fact label="Color" value={pet.color} raw />}
          </Section>
        )}

        {pet.adoptionRequirements?.length > 0 && (
          <Section icon={<PawPrint size={18} />} title="Adoption requirements">
            <ul>{pet.adoptionRequirements.map((r) => <li key={r}>{r}</li>)}</ul>
          </Section>
        )}

        <Section icon={<Coins size={18} />} title="Adoption fee">
          <p>{pet.adoptionFee > 0 ? `$${pet.adoptionFee}` : "Free"}</p>
        </Section>

        {pet.rescueDate && (
          <Section icon={<Calendar size={18} />} title="Rescue date">
            <p>{new Date(pet.rescueDate).toLocaleDateString("en-US")}</p>
          </Section>
        )}

        {pet.owner && (
          <div className="owner-card">
            <div className="owner-card-header">
              <img src={pet.owner.image} alt={pet.owner.userName} />
              <div>
                <p className="owner-name">
                  {isShelter ? pet.owner.shelterName : pet.owner.userName}
                  {pet.owner.shelterVerified && <ShieldCheck size={16} className="verified-icon" />}
                </p>
                <p className="owner-type">{isShelter ? "Shelter" : "Individual owner"}</p>
              </div>
            </div>
            {pet.owner.phoneNumber && (
              <a className="owner-contact-row" href={`tel:${pet.owner.phoneNumber}`}>
                <Phone size={16} /> {pet.owner.phoneNumber}
              </a>
            )}
            {pet.owner.email && (
              <a className="owner-contact-row" href={`mailto:${pet.owner.email}`}>
                <Mail size={16} /> {pet.owner.email}
              </a>
            )}
            {user && user.id !== pet.owner._id && (
              <Link
                className="link-unstyled owner-message-btn"
                to={`/users/chat/${pet.owner._id}/${pet._id}`}
              >
                <MessageCircle size={18} />
                Message about {pet.name}
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="pet-actions">
        <button className="pet-action-btn pet-action-dislike" onClick={handleDislike} aria-label="Pass">
          <X size={24} />
        </button>
        <button className="pet-action-btn pet-action-like" onClick={handleLike} aria-label="Like">
          <Heart size={26} fill="currentColor" strokeWidth={0} />
        </button>
      </div>
    </div>
  );
}

const Fact = ({ label, value, raw }) => (
  <div className="fact-row">
    <span>{label}</span>
    <span>{raw ? value : value ? "Yes" : "No"}</span>
  </div>
);

const Section = ({ icon, title, children }) => (
  <div className="pet-section">
    <h5>{icon} {title}</h5>
    {children}
  </div>
);

export default PetDetail;