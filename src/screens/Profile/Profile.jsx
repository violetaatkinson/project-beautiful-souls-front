import { useState, useEffect } from 'react';
import { getCurrentUser } from '../../services/UserService'

// eslint-disable-next-line 
import profile from "./Profile.css";

const Profile = () => {
   const [user, setUser] = useState([]);
  
  useEffect(() => {
   getCurrentUser()
     .then(userData => {
      setUser(userData);
     })
    }, []);

  
    return (
      <div>
      <section className="curved">
         <div className='profile-info'>
            <h2>Profile</h2>
            <img src={user.image} alt={user.name} className="rounded-circle border-3 m-2" width={120}/>
            <h5>{user.name}</h5>
         </div>

      </section>
      </div>
    )
  }
  
  export default Profile

