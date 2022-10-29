import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import logo from '../../../assets/cat.png'
import bell from '../../../assets/bell.png'
// eslint-disable-next-line 
import nabvar from './Navbar.css'


function Navbar () {
    const { user } = useContext(AuthContext);

    return (
        <div className='navbar'>
            <Link className="link-unstyled" to={"/profile"}>
                <img src={user.image} alt="user" className="rounded-circle bg-info bg-opacity-10 border border-3 m-2 user-img" width={40}/>
            </Link>
           <img src={logo} alt="logo" width={51}/>
           <img src={bell} alt ="bell" width={35}/>
        </div>
    )
}

export default Navbar

// a veces se ve la imagen del perfil y otras veces no 
