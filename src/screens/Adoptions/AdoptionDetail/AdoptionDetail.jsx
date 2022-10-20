import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAdoptionsDetail } from "../../../services/AdoptionService"

function AdoptionDetail() {
    const [pet, setDetail] = useState()
    const { id } = useParams();

    useEffect(() => {
		getAdoptionsDetail(id)
            .then((detail) => {
                setDetail(detail);
            });
	}, [id]);

    return (
        <div>
            {pet ? (
				<>
				    <div>
                        <img src={pet.image} alt={pet.name} width={120}/>
                        <div className="Detail-info">
                            <h1>{pet.name}</h1>
                            <strong>{pet.years}</strong>
                            <small>{pet.specie}</small>
                            <p>{pet.size}</p>
                            <p>{pet.gender}</p>
                            <p>{pet.description}</p>
                        </div>
                    </div>	
				</>
			) : (
				<p>Loading details...</p>
			)}
        </div>
    )
}

export default AdoptionDetail