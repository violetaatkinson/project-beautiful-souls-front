import { getAdoptions, likeAdoptions } from "../../../services/AdoptionService"
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heart from '../../../assets/corazon.png'
import no from '../../../assets/close.png'
import back from '../../../assets/return.png'

// eslint-disable-next-line
import list from './AdoptionList.css'
import { NavbarLayout } from "../../../layout/NavbarLayout";


// como hago las adopciones como tinder ?
//funcionalidad de boton de dislike que no me lo muestre mas si no quiero a ese pet
// funcionalidad de boton de return que me traiga a ese pet de nuevo 
// los botones siempre quedan y tienen que estar fuera de la card 
//para que solo se muestre una imagen a la vez

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
        <NavbarLayout>
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {pets.map((pet) => {
                        return (
                            <div className={`carousel-item ${pet._id === pets[0]._id ? "active" : ""}`} key={pet._id}>
                                <div style={{backgroundImage: 'url(' + pet.image + ')'}} className="item-img"></div>
                                <div className="item-content">
                                    <Link className="link-unstyled" to={`/adoptions/${pet._id}`}>
                                        <h4>{pet.name}</h4>
                                    </Link>
                                    <div className="carousel-card-buttons">
                                        <button className="btn btn-danger btn-sm">
                                            <img src={heart} alt="heart" height={20} onClick={() => handleLike(pet._id)}/>
                                        </button>
                                        <button className="btn btn-success btn-sm ">
                                            <img src={back} alt="heart" />
                                        </button>
                                        <button className="btn btn-dark btn-sm ">
                                            <img src={no} alt="heart" />
                                        </button>                          
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

export default AdoptionList



