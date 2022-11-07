import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAdoptionsDetail } from "../../../services/AdoptionService"
// eslint-disable-next-line 
import adoptionDetail from './AdoptionDetail.css'
import heart from '../../../assets/corazon.png'

import {Link} from "react-router-dom"



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
                        <div className="detail-img">
                            <img src={pet.image} alt={pet.name} width={380} />
                            <button className="btn btn-danger  "><img src={heart} alt="heart" width={20} height={20} /></button>
                        </div>
                        <div className="mt-3 text-start card-title ">    
                            <span>
                                <h1>{pet.name}</h1> 
                                <p>{pet.years}</p>
                            </span>
                            <div className="card-text">
                                <p><strong></strong> {pet.size}</p> 
                                <p><strong></strong> {pet.gender}</p>
                                <p><strong></strong> {pet.description} </p>
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

