import {dislikeAdoptions, getAdoptions, getAdoptionsCount, likeAdoptions} from "../../../services/AdoptionService";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import like from '../../../assets/like.png'
import dislike from '../../../assets/dislike.png'
import back from '../../../assets/back.png'


import { NavbarLayout } from "../../../layout/NavbarLayout";

// eslint-disable-next-line
import list from "./AdoptionList.css";

function AdoptionList() {
	const [pets, setPets] = useState([]);
	const [currentPetId, setCurrentPetId] = useState(0);
    const [adoptionsCount, setAdoptionsCount] = useState();

	const currentPet = pets?.[currentPetId];
    

    useEffect(() => {
        getAdoptionsCount()
            .then((count) => setAdoptionsCount(count))
    }, [])

    console.log(adoptionsCount)


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
       
			<div
				id="carouselExampleSlidesOnly"
				className="carousel slide"
				data-bs-ride="carousel"
			>
				{currentPet ? (
                    
					<div className="carousel-inner">
						<div className="carousel-item active mt-3" key={currentPet._id}>
							<div
								style={{ backgroundImage: "url(" + currentPet.image + ")" }}
								className="item-img"
							></div>
							<div className="item-content">
								<Link
									className="link-unstyled"
									to={`/adoptions/${currentPet._id}`}
								>
									<h4>{currentPet.name}</h4>
								</Link>
								<div className="carousel-card-buttons mt-3">
									<img src={like} alt="heart" height={50} onClick={handleLike}/>
									<img src={back} alt="heart" height={50}  onClick={handleGoBack}/>
									<img src={dislike} alt="heart" height={55} onClick={handleDislike}/>	
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="not-found">
						<h5 className="mt-5 text-center text-secondary">Adoptions not found</h5>
							<span class="loadr"></span>
						{currentPetId === 1 && (
							<button className="btn btn-primary btn-md mt-4" onClick={handleGoBack}>
								Return to last
							</button>
						)}
					</div>
				)}
			</div>
		</NavbarLayout>
	);
}

export default AdoptionList;
