import { getAdoptions, likeAdoptions } from "../../../services/AdoptionService"
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import like from '../../../assets/like.png';
import dislike from '../../../assets/dislike.png';
import back from '../../../assets/back.png';
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
        <div className="list mb-5">
            <div className="container">
                <div className="row">
                    {pets.map((pet) => {
                        return (
                            <div className="col" key={pet._id}>
                                <div className="card list-card mt-5 " width="18rem">
                                    <img src={pet.image} className="card-img-top" alt={pet.name}/>
                                    <div className="card-body">
                                        <Link className="link-unstyled" to={`/adoptions/${pet._id}`}>
                                            <h4 className="card-title">{pet.name}<p className="card-text">{pet.years}</p></h4>
                                        </Link> 
                                    </div>
                                    <div className="buttons mb-3">
                                        <img src={like} alt="like" onClick={() => handleLike(pet._id)} />
                                        <img src={back} alt="back"/>
                                        <img src={dislike} alt="dislike"/>
                                    </div>
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

 
