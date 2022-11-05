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
        <div className='navbar '>
            <Link className="link-unstyled" to={"/profile"}>
                <img src={user.image} alt="user" className="rounded-circle m-2 user-img" width={60} height={60}/>
            </Link>
            <Link className="link-unstyled" to={"/adoptions"}>
                <img src={logo} alt="logo" width={55} height={55}/>
            </Link>
           <img src={bell} alt ="bell" width={40} height={40} className="bell"/>
        </div>
    )
}

export default Navbar

// a veces se ve la imagen del perfil y otras veces no 
