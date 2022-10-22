import { useState } from 'react';
import { useContext, useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { getLikes } from '../../services/UserService';

// eslint-disable-next-line 
import profile from "./Profile.css";

const Profile = () => {

   const { user } = useContext(AuthContext)
   

   const [likes, setLikes] = useState([]);
  
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
      
      {likes.map(like => (
         <p key={like._id}>{like.name}</p>
      ))}
      </div>
    )
  }
  
  export default Profile

