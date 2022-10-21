import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAdoptionsDetail } from "../../../services/AdoptionService"
// eslint-disable-next-line 
import adoptionDetail from './AdoptionDetail.css'
import like from '../../../assets/like.png';
import dislike from '../../../assets/dislike.png';
import back from '../../../assets/back.png';

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
				    <div className="detail align-items-center">
                        <div className="mt-5">
                            <img src={pet.image} alt={pet.name} width= "300"  />
                        </div>
                        <div className="mt-3 text-start info ">    
                            <span>
                                <h1>{pet.name}</h1> 
                                <p>{pet.years}</p>
                            </span>
                            <div>
                                <p>Size : {pet.size}</p> 
                                <p>Gender : {pet.gender}</p>
                                <p>Description : {pet.description} </p>
                            </div>
                           
                        </div> 
                        <div className="buttons mt-2">
                            <img src={like} alt="like" width="75" />
                            <img src={back} alt="like" width="75"/>
                            <img src={dislike} alt="like" width="75"/>
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

