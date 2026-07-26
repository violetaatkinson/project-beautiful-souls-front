import { useState , useEffect  } from "react";
import { Link } from "react-router-dom";
import { getAllMyAdoptions, deleteAdoption } from "../../../services/AdoptionService";


import { NavbarLayout } from "../../../layout/NavbarLayout";

import './MyPetsCreated.css'


const CreatedPets = () => {
    const [myPets, setMyPets] = useState([]);
    

   
    useEffect(() => {
    getAllMyAdoptions()
      .then((res) => {
			setMyPets(res);
		});
	}, []);

   
    // eslint-disable-next-line no-unused-vars
    const handleDelete = (_id) => {
        deleteAdoption(_id)
          .then(() => {
              setMyPets((prevPets) => [...prevPets.filter(pet => pet._id !== _id)])
          })
       
      }

	return (
    <NavbarLayout>
	    <div>
             <h2 className="text-center mt-3 pets-title">Pets Created</h2>
                {myPets.length > 0  ?
                    <div className="container mt-4">
                        {myPets.map((myPet) => (
                            <div key={myPet._id} className="col mb-4">
                                <span className="created-first">
                                    <img src={myPet.image} alt={myPet.name}  width={260}/>
                                    <Link className="link-unstyled " to={`/adoptions/${myPet._id}`}>
                                        <h5 className="petName">{myPet.name}</h5>
                                    </Link>
                                </span>
                                <div className="mt-3 created-buttons mb-4">
                                   
                                    <Link className="link-unstyled" to={`/adoptions/edit/${myPet._id}`}>
                                        
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    :<div className="created-buttons">
                        <p className="text-center text-secondary mt-3"> No adoptions were created</p>
                    </div>
                } 
	    </div>
    </NavbarLayout>
	);
};

export default CreatedPets;