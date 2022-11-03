import { useState , useEffect  } from "react";
import { Link } from "react-router-dom";
import { getAllMyAdoptions, likeAdoptions, deleteAdoption } from "../../../services/AdoptionService";
import { getLikes } from "../../../services/UserService";
import heart from '../../../assets/corazon.png'
import trash from '../../../assets/trash.png'
import pen from '../../../assets/boligrafo.png'
import corgiHeart from '../../../assets/corgi-heart.png'
import corgiPresent from '../../../assets/corgi-present.png'
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
            <section>
                {myPets.length > 0  ?
                <div className="container">
                    <div className="row pet-info">
                        {myPets.map((myPet) =>(
                            <div key={myPet._id} className="col-12 col-md-6 col-lg-4">
                                <img src={myPet.image} alt={myPet.name} width={200} className="mt-3 pet-img"/>
                                <Link className="link-unstyled " to={`/adoptions/${myPet._id}`}>
                                    <h5 className="petName">{myPet.name}</h5>
                                </Link>
                                    <div className="del">
                                        <button className="btn btn-outline-danger btn-sm "><img src={trash} alt="trash" width={17} onClick={() => handleDelete(myPet._id)}/> Delete</button>
                                        <Link className="link-unstyled" to={`/adoptions/edit/${myPet._id}`}>
									    <button className="btn btn-outline-success btn-sm "><img src={pen} alt="pen" width={17}/>  Edit</button>
									    </Link>
                                    </div>
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div className="m-4">
                    <h4 className="mt-5">Create an adoption</h4>
                    <img src={corgiPresent} alt="dog" width={200} className="mt-3 mb-5"/>
                </div>
                }
            </section>

            <hr/>

            <section>
               
                {likes.length > 0 ? 
                <div className="container">
                      <div className="row">
                        {likes.map((like) =>(
                            <div key={like._id} className="col-12 col-md-6 col-lg-4">
                                <img src={like.image} alt={like.name} width={200} height={260} className="mt-3"/>
                                <Link className="link-unstyled " to={`/adoptions/${like._id}`}>
                                    <h5 className="petName">{like.name}</h5>
                                </Link>
                                <div className="del">
                                     <button className="btn btn-danger btn-sm "><img src={heart} alt="heart" width={17} onClick={() => handleLike(like._id)}/>  Like</button>
                                </div>           
                            </div>
                        ))}
                      </div>
                </div>
                :
                <div className="m-4">
                    <h4 className="mt-5">Give us a like</h4>
                    <img src={corgiHeart} alt="dog" width={200} className="mt-3 mb-5"/>
                </div>
                }
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