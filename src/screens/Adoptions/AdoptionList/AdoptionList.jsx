import { getAdoptions } from "../../../services/AdoptionService"
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";



function AdoptionList() {
    const [pets, setPets] = useState([]);
    
    useEffect(() => {
		getAdoptions()
            .then((adoption) => {
                console.log(adoption)
                setPets(adoption);
            });
	}, []);
   
    return (
        <div>
            {pets.map((pet) => {
                return (
                   <div key={pet._id}>
                   <Link className="link-unstyled" to={`/adoptions/${pet._id}`}>
                          <h1>{pet.name}</h1>
                      </Link>
                        <small>{pet.years}</small>    
                   </div> 
                )

            })}
        </div>
    )
}

export default AdoptionList

//esto hacerlo un componente card asi esta mas prolijo 


