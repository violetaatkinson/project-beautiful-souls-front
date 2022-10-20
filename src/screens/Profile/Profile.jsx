import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';

// eslint-disable-next-line 
import profile from "./Profile.css";

const Profile = () => {

   const { user } = useContext(AuthContext)

//    const [user, setUser] = useState([]);
  
//   useEffect(() => {
//    getCurrentUser()
//      .then(userData => {
//       setUser(userData);
//      })
//     }, []);

  
    return (
      <div>
      <section className="curved">
         <div className='profile-info'>
            <h2>Profile</h2>
            <img src={user.image} alt={user.userName} className="rounded-circle border-3 m-2" width={120}/>
            <h5>{user.userName}</h5>
         </div>

      </section>
      </div>
    )
  }
  
  export default Profile

