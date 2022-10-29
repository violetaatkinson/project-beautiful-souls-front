import { useState , useEffect  } from "react";
import { Link } from "react-router-dom";
import { getAllMyAdoptions, likeAdoptions, deleteAdoption } from "../../../services/AdoptionService";
import { getLikes } from "../../../services/UserService";
import heart from '../../../assets/corazon.png'
import trash from '../../../assets/trash.png'
import pen from '../../../assets/boligrafo.png'
import { NavbarLayout } from "../../../layout/NavbarLayout";

// eslint-disable-next-line 
import likedPets from './LikedPets.css'


const LikedPets = () => {
    const [myPets, setMyPets] = useState([]);
    const [likes, setLikes] = useState([]);
   

    useEffect(() => {
		getAllMyAdoptions()
      .then((res) => {
			setMyPets(res);
		});
	}, []);

   
    useEffect(() => {
		getLikes()
      .then((dbLikes) =>
       setLikes(dbLikes.filter((like) => like))); // Te quita los nulls y los undefined
	}, []);

    const handleLike = (id) => {
		likeAdoptions(id).then((res) => {
			const likedPet = likes.filter((pet) => pet._id !== id);
			setLikes(likedPet);
			// hacer un setPets, pero quitandome la pet que tiene este id
		});
	};

    const handleDelete = (_id) => {
        deleteAdoption(_id)
          .then(() => {
              setMyPets((prevPets) => [...prevPets.filter(pet => pet._id !== _id)])
          })
       
      }

	return (
    <NavbarLayout>
	    <div>
            <form className="d-flex col-auto mt-4 mb-4" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-dark" type="submit">Search</button>
            </form>
            
            <section>
                <h4>Created Adoptions</h4>	
                <div className="container">
                    <div className="row">
                        {myPets.map((myPet) =>(
                            <div key={myPet._id}>
                                <img src={myPet.image} alt={myPet.name} width={200} className="mt-3"/>
                                <Link className="link-unstyled " to={`/adoptions/${myPet._id}`}>
                                    <h5 className="mt-2">{myPet.name}</h5>
                                    <div className="del">
                                        <button className="btn btn-outline-secondary btn-sm mt-2"><img src={trash} alt="trash" width={25} onClick={() => handleDelete(myPet._id)}/></button>
                                        <Link className="link-unstyled" to={`/adoptions/edit/${myPet._id}`}>
									    <button className="btn btn-outline-success btn-sm mt-2"><img src={pen} alt="pen" width={25}/></button>
									    </Link>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>				
            </section>

            <hr/>

            <section>
                <h4>Liked Adoptions</h4>
                <div className="container">
                    <div className="row">
                        {likes.map((like) =>(
                            <div key={like._id}>
                                <img src={like.image} alt={like.name} width={200} className="mt-3"/>
                                <Link>
                                    <div className="heart mb-3">
                                        <h5 className="mt-3">{like.name}</h5>
                                        <button className="btn btn-outline-danger btn-sm mt-2"><img src={heart} alt="heart" width={25} onClick={() => handleLike(like._id)}/></button>
                                    </div>    
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

	    </div>
    </NavbarLayout>
	);
};

export default LikedPets;


// si no hay mascotas creadas q no aparezca el cartel de create adoptions 
//sino algo como una imagen de crear una adopcion
// si no hay mascotas likeadas q no aparezca el cartel de create adoptions 
//sino algo como una imagen de crear una adopcion