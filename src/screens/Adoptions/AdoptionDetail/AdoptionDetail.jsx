import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAdoptionsDetail } from "../../../services/AdoptionService"
// eslint-disable-next-line 
import adoptionDetail from './AdoptionDetail.css'


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
                            <img src={pet.image} alt={pet.name} width={270} className="mt-3"/>
                        </div>
                        <div className="mt-3 text-start card-title ">    
                            <span>
                                <h1>{pet.name}</h1> 
                                <p>{pet.years}</p>
                            </span>
                            <div className="card-text">
                                <p><strong>Size :</strong> {pet.size}</p> 
                                <p><strong>Gender :</strong> {pet.gender}</p>
                                <p><strong>Description :</strong> {pet.description} </p>
                            </div>  
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

