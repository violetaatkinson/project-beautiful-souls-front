import {dislikeAdoptions, getAdoptions, likeAdoptions} from "../../../services/AdoptionService";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, X, RotateCcw } from 'lucide-react'

import { NavbarLayout } from "../../../layout/NavbarLayout";

import "./AdoptionList.css";

function AdoptionList() {
	const [pets, setPets] = useState([]);
	const [currentPetId, setCurrentPetId] = useState(0);
    

	const currentPet = pets?.[currentPetId];
    

	useEffect(() => {
		getAdoptions().then((adoptions) => {
			setPets(adoptions);
		});
	}, []);

	const handleLike = () => {
		likeAdoptions(currentPet._id).then(() => {
			const likedPet = pets.filter((pet) => pet._id !== currentPet._id);
			setPets(likedPet);
			// hacer un setPets, pero quitandome la pet que tiene este id
		});
	};

	const handleDislike = () => {
		dislikeAdoptions(currentPet._id).then(() => {
			if (currentPetId === 0) {
				setCurrentPetId(1);
			} else {
				const updatedPets = pets.filter((pet) => pet._id !== pets[0]._id);
				setPets(updatedPets);
			}
		});
	};

	const handleGoBack = () => {
		if (currentPetId === 1) {
			setCurrentPetId(0);
		}
	};

	return (
		<NavbarLayout>
			<div className="swipe-screen">
				{currentPet ? (
					<div className="swipe-card" key={currentPet._id}>
						<Link to={`/adoptions/${currentPet._id}`} className="link-unstyled">
							<div
								style={{ backgroundImage: "url(" + currentPet.image + ")" }}
								className="item-img"
							>
								<div className="item-overlay">
									<h4>{currentPet.name}</h4>
									{currentPet.specie && <p>{currentPet.specie}</p>}
								</div>
							</div>
						</Link>
						<div className="carousel-card-buttons mt-3">
							<button className="swipe-btn swipe-btn-back" onClick={handleGoBack} aria-label="Volver">
								<RotateCcw size={22} />
							</button>
							<button className="swipe-btn swipe-btn-dislike" onClick={handleDislike} aria-label="No me gusta">
								<X size={28} />
							</button>
							<button className="swipe-btn swipe-btn-like" onClick={handleLike} aria-label="Me gusta">
								<Heart size={24} fill="currentColor" strokeWidth={0} />
							</button>
						</div>
					</div>
				) : (
					<div className="not-found">
						<h5 className="mt-5 text-center text-secondary">No hay más mascotas por ahora</h5>
						<span className="loadr"></span>
						{currentPetId === 1 && (
							<button className="btn btn-primary btn-md mt-4" onClick={handleGoBack}>
								Volver a la anterior
							</button>
						)}
					</div>
				)}
			</div>
		</NavbarLayout>
	);
}

export default AdoptionList;