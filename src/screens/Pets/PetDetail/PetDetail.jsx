
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Syringe, Zap, Users, PawPrint } from "lucide-react";
import { getPetDetail } from "../../../services/PetService";
import "./PetDetail.css";

function PetDetail() {
  const [pet, setPet] = useState();
  const [photoIndex, setPhotoIndex] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    getPetDetail(id).then(setPet);
  }, [id]);

  if (!pet) return <p className="text-center mt-5">Cargando...</p>;

  const age = [
    pet.ageYears ? `${pet.ageYears} años` : null,
    pet.ageMonths ? `${pet.ageMonths} meses` : null,
  ].filter(Boolean).join(" y ");

  return (
    <div className="pet-detail">
      <div className="pet-carousel">
        <div
          className="pet-carousel-img"
          style={{ backgroundImage: `url(${pet.images[photoIndex]})` }}
        />
        <div className="pet-carousel-dots">
          {pet.images.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === photoIndex ? "active" : ""}`}
              onClick={() => setPhotoIndex(i)}
            />
          ))}
        </div>
        <Link className="pet-back-btn" to="/adoptions"><ArrowLeft size={20} /></Link>
        <div className="pet-carousel-overlay">
          <h1>{pet.name}{age && `, ${age}`}</h1>
          <p>{pet.breed || pet.species} · {pet.size}</p>
        </div>
      </div>

      <div className="pet-body">
        <div className="pet-chips">
          {pet.personalityTags.map((tag) => (
            <span key={tag} className="chip">{tag}</span>
          ))}
        </div>

        <p className="pet-description">{pet.description}</p>

        <Section icon={<Syringe size={18} />} title="Salud">
          <Fact label="Vacunado" value={pet.health.vaccinated} />
          <Fact label="Castrado" value={pet.health.sterilized} />
          <Fact label="Desparasitado" value={pet.health.dewormed} />
        </Section>

        <Section icon={<Zap size={18} />} title="Energía">
          <p>{pet.energyLevel}</p>
        </Section>

        <Section icon={<Users size={18} />} title="Convivencia">
          <Fact label="Con niños" value={pet.compatibility.withKids} tri />
          <Fact label="Con perros" value={pet.compatibility.withDogs} tri />
          <Fact label="Con gatos" value={pet.compatibility.withCats} tri />
        </Section>

        {pet.adoptionRequirements.length > 0 && (
          <Section icon={<PawPrint size={18} />} title="Requisitos para adoptar">
            <ul>{pet.adoptionRequirements.map((r) => <li key={r}>{r}</li>)}</ul>
          </Section>
        )}
      </div>
    </div>
  );
}

const Fact = ({ label, value, tri }) => (
  <div className="fact-row">
    <span>{label}</span>
    <span>{tri ? { yes: "Sí", no: "No", unknown: "No especificado" }[value] : value ? "Sí" : "No"}</span>
  </div>
);

const Section = ({ icon, title, children }) => (
  <div className="pet-section">
    <h5>{icon} {title}</h5>
    {children}
  </div>
);

export default PetDetail;