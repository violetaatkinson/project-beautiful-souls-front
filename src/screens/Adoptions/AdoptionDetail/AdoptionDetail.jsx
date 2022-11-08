import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAdoptionsDetail } from "../../../services/AdoptionService"
// eslint-disable-next-line 
import adoptionDetail from './AdoptionDetail.css'
import back from '../../../assets/back.png'

import {Link} from "react-router-dom"



function AdoptionDetail() {
    const [pet, setDetail] = useState()
    const { id } = useParams();
      console.log(pet);
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
                        </div>
                        <div className="mt-3 text-start  ">    
                            <h1>{pet.name}</h1> 
                        </div> 
                        <div className="detail-info mt-5">
                            <p>{pet.gender}</p>
                            <p>{pet.years} Years</p>
                            <p>{pet.size}</p>
                        </div>
                        <h3 className="text-center mt-3 mb-3 text-capitalize">{pet.description}</h3>
                        <span className="detail-back mt-3">
                           <Link className="link-unstyled" to={"/adoptions"}>
                                <img src={back} alt="back" width={60}/>
                           </Link>
                        </span>
                    </div>	
				</>
			) : (
				<p>Loading details...</p>
			)}
        </div>
    )
}

export default AdoptionDetail

