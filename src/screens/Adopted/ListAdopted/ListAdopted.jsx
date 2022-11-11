import { getAdopted } from '../../../services/AdoptedService'
import { NavbarLayout } from '../../../layout/NavbarLayout';
import React, { useState, useEffect } from "react";
import css from './ListAdopted.css'


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
                <div className="row mt-4">
                    {pets.map((pet) => {
                            return (
                                <div key={pet._id} className="col-12 col-md-6 col-lg-4 m-3" style={{ width: '22rem' }} >
                                    <div className='card  p-3 mb-5 bg-body rounded adopted-card' >
                                        <img src={pet.image} className="card-img-top adoption-img" alt="petImage" />
                                        <div className="card-body info-adopted text-center">
                                            <h5 className="card-title">{pet.petName}</h5>
                                            <hr></hr>
                                            <p className="card-text mt-2">{pet.content}</p>
                                        </div>
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



