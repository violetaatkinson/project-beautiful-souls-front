import { getAdoptions } from "../../../services/AdoptionService"
import React, { useState, useEffect } from "react";

function AdoptionList() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
		getAdoptions()
            .then((adoption) => {
                setPets(adoption);
            });
	}, []);

    return (
        <div>
            {pets.map((pet) => {
                return (
                   <div key={pet._id}>
                        <h1>{pet.name}</h1>
                        <small>{pet.years}</small>
                        <p>{pet.specie}</p>
                        <p>{pet.description}</p>
                        <p>{pet.description}</p>
                        <p>{pet.size}</p>
                        <p>{pet.owner}</p>
                   </div> 
                )

            })}
        </div>
    )
}

export default AdoptionList

//esto hacerlo un componente card asi esta mas prolijo 