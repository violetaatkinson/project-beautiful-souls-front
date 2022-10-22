import { useState } from 'react';
import { useContext, useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { getLikes } from '../../services/UserService';
import { Link } from "react-router-dom";
import { likeAdoptions } from "../../services/AdoptionService"
import liked from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import back from '../../assets/back.png';


// eslint-disable-next-line 
import profile from "./Profile.css";

const Profile = () => {

   const { user } = useContext(AuthContext)
   

   const [likes, setLikes] = useState([]);

 
   const handleLike = (id) => {
      likeAdoptions(id)
          .then(res => {
              const likedPet = likes.filter(pet => pet._id !== id)
              setLikes(likedPet)
              // hacer un setPets, pero quitandome la pet que tiene este id
          })
  }
  
   useEffect(() => {
      getLikes()
         .then(dbLikes => setLikes(dbLikes.filter(like => like))) // Te quita los nulls y los undefined
   }, []);

  
    return (
      <div>
      <section className="curved">
         <div className='profile-info'>
            <h2>Profile</h2>
            <img src={user.image} alt={user.userName} className="rounded-circle border-3 m-2" width={120}/>
            <h5>{user.userName}</h5>
         </div>

      </section>

      <h3>Pets you liked</h3>
       <div className="container">
         <div className="row">
            {likes.map(like => (
               <div className="col" key={like._id}>
                  <div className="card list-card mt-5 " width="18rem">
                     <img src={like.image} className="card-img-top" alt={like.name}/>
                     <div className="card-body">
                        <Link className="link-unstyled" to={`/adoptions/${like._id}`}>
                           <h4 className="card-title">{like.name}<p className="card-text">{like.years}</p></h4>
                        </Link>
                     </div>
                     <div className="buttons mb-3">
                        <img src={liked} alt="like" onClick={() => handleLike(like._id)} />
                        <img src={back} alt="back"/>
                        <img src={dislike} alt="dislike"/>
                     </div>
                  </div>
               
               </div>
            ))}
         </div>
      </div>

      </div>
    )
  }
  
  export default Profile


