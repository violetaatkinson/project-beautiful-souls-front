import { getAdopted } from '../../services/AdoptedService'
import { NavbarLayout } from '../../layout/NavbarLayout';
import React, { useState, useEffect } from "react";

function AdoptedList() {
    const [pets, setPets] = useState([]);

  
    useEffect(() => {
		getAdopted()
            .then((adopted) => {
                console.log(adopted)
                setPets(adopted);
            });
	}, []);

    console.log(pets)

 
    return (
        <NavbarLayout>
            <div className="container">
                <div className="row">
                    {pets.map((pet) => {
                            return (
                                <div key={pet._id} className="col card" width= "18rem">
                                    <img src={pet.image} className="card-img-top" alt="petImage"/>
                                    <div className="card-body">
                                        <p className="card-text">{pet.content}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
            </div>
        </NavbarLayout>
    )
}

export default AdoptedList





