import { getAdoptions, likeAdoptions } from "../../../services/AdoptionService"
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heart from '../../../assets/corazon.png'
import no from '../../../assets/close.png'
import back from '../../../assets/return.png'

// eslint-disable-next-line
import list from './AdoptionList.css'


function AdoptionList() {
    const [pets, setPets] = useState([]);

  
    useEffect(() => {
		getAdoptions()
            .then((adoption) => {
                console.log(adoption)
                setPets(adoption);
            });
	}, []);

    const handleLike = (id) => {
        likeAdoptions(id)
            .then(res => {
                const likedPet = pets.filter(pet => pet._id !== id)
                setPets(likedPet)
                // hacer un setPets, pero quitandome la pet que tiene este id
            })
    }
   


    return (
        <div>
            <div className="container tinder mt-5">
                <div className="row">
                    {pets.map((pet) => {
                        return (
                            <div className="col tinder-card" key={pet._id}>
                            <img src={pet.image} alt={pet.name} width={250} className="mt-3"/>
                            <div className="card-body tinder-info">
                                <Link className="link-unstyled" to={`/adoptions/${pet._id}`}>
                                    <h4 className="card-title">{pet.name}<p className="card-text">{pet.years}</p></h4>
                                </Link>
                            </div>
                            <div className="tinder-buttons mt-2">
                                <button className="btn btn-danger btn-sm ">Like <img src={heart} alt="heart" width={17} onClick={() => handleLike(pet._id)}/></button>
                                <button className="btn btn-success btn-sm ">Return <img src={back} alt="heart" width={17} /></button>
                                <button className="btn btn-dark btn-sm ">Dislike <img src={no} alt="heart" width={13} /></button>
                            </div>
                            </div>
                        )

                    })}
                </div>
            </div> 
        </div>
    )
}

export default AdoptionList


