import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart } from 'lucide-react'
import { getLikedAdoptions, likeAdoptions } from "../../../services/AdoptionService";
import { NavbarLayout } from "../../../layout/NavbarLayout";
import './MyLikes.css'

const MyLikes = () => {
    const [likedPets, setLikedPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLikedAdoptions()
            .then((res) => setLikedPets(res))
            .finally(() => setLoading(false));
    }, []);

    const handleRemoveLike = (petId) => {
        // Un segundo POST a /like/:id saca el like (toggle en el backend)
        likeAdoptions(petId).then(() => {
            setLikedPets((prev) => prev.filter((pet) => pet._id !== petId));
        });
    };

    return (
        <NavbarLayout>
            <div className="my-likes">
                <h2 className="text-center mt-3 likes-title">Mascotas que te gustaron</h2>

                {loading && (
                    <p className="text-center text-secondary mt-4">Cargando...</p>
                )}

                {!loading && likedPets.length === 0 && (
                    <div className="likes-empty">
                        <Heart size={40} strokeWidth={1.5} />
                        <p className="text-secondary mt-2">
                            Todavía no le diste like a ninguna mascota.<br />
                            Andá a "Explore" para descubrir a tu compañero ideal.
                        </p>
                    </div>
                )}

                {!loading && likedPets.length > 0 && (
                    <div className="likes-grid">
                        {likedPets.map((pet) => (
                            <div key={pet._id} className="like-card">
                                <Link to={`/adoptions/${pet._id}`} className="link-unstyled">
                                    <div
                                        className="like-card-img"
                                        style={{ backgroundImage: `url(${pet.image})` }}
                                    />
                                    <p className="like-card-name">{pet.name}</p>
                                </Link>
                                <button
                                    className="like-remove-btn"
                                    onClick={() => handleRemoveLike(pet._id)}
                                    aria-label="Quitar de favoritos"
                                >
                                    <Heart size={18} fill="currentColor" strokeWidth={0} />
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