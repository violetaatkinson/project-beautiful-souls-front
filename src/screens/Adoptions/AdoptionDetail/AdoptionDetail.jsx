import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone } from 'lucide-react'
import { getAdoptionsDetail } from "../../../services/AdoptionService"
import { useAuthContext } from "../../../contexts/AuthContext";
import './AdoptionDetail.css'


function AdoptionDetail() {
    const [pet, setDetail] = useState()
    const { id } = useParams();
    const { user } = useAuthContext();

    useEffect(() => {
        getAdoptionsDetail(id)
        .then((detail) => {
            setDetail(detail);
        });
	}, [id]);

    const isOwnPet = pet?.owner && user?._id === (pet.owner._id || pet.owner);

    return (
        <div className="detail-screen">
            {pet ? (
				<>
                    <div
                        className="detail-hero"
                        style={{ backgroundImage: `url(${pet.image})` }}
                    >
                        <Link className="link-unstyled detail-back-btn" to={"/adoptions"}>
                            <ArrowLeft size={20} />
                        </Link>
                        <div className="detail-hero-overlay">
                            <h1>{pet.name}</h1>
                            <p className="detail-specie">{pet.specie}</p>
                        </div>
                    </div>

                    <div className="detail-body">
                        <div className="detail-chips">
                            {pet.gender && <span className="chip">{pet.gender}</span>}
                            {pet.years != null && <span className="chip">{pet.years} años</span>}
                            {pet.size && <span className="chip">{pet.size}</span>}
                        </div>

                        {pet.description && (
                            <p className="detail-description">{pet.description}</p>
                        )}

                        {!isOwnPet && pet.owner && (pet.owner.email || pet.owner.phoneNumber) && (
                            <div className="owner-card">
                                <h5>Contactar al dueño</h5>
                                <p className="owner-name text-capitalize">{pet.owner.userName}</p>
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
                            </div>
                        )}
                    </div>
				</>
			) : (
				<p className="text-center mt-5">Cargando detalle...</p>
			)}
        </div>
    )
}

export default AdoptionDetail